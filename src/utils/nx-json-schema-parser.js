import {
  mapValues,
  omit,
  omitBy,
  isArray,
  capitalize,
  lowerCase,
} from "lodash";

export const visitor = () => ({
  prop(prop, propName) {
    this.setValue(
      {
        type: isArray(prop.type) ? prop.type[0] : prop.type,
        label: prop.title || capitalize(lowerCase(propName)),
        fields: prop.properties,
        format: prop.format,
        required: isArray(prop.type) && prop.type.includes("null"),
      },
      "fields"
    );
  },
});

export class JsonSchemaModel {
  constructor(value, name = "root") {
    this._value = null;
    this._propKey = "properties";
    this._children = null;
    this._name = name;

    this.setValue(value, "properties");
  }

  getValue() {
    return this._value;
  }

  setValue(value, propKey) {
    this._value = omitBy(value, (value) => value === undefined);
    this.setChildren(
      mapValues(
        value[propKey] || {},
        (prop, name) => new JsonSchemaModel(prop, name)
      )
    );
    this._value = omit(value, propKey);
    this.setPropKey(propKey);
  }

  getPropKey() {
    return this._propKey;
  }

  setPropKey(propKey) {
    this._propKey = propKey;
  }

  getChildren() {
    return this._children;
  }

  setChildren(children) {
    this._children = children;
  }

  hasChildren() {
    return Object.keys(this._children).length > 0;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this.name = name;
  }

  export() {
    return {
      ...this.getValue(),
      [this.getPropKey()]: mapValues(this.getChildren(), (child) =>
        child.export()
      ),
    };
  }
}

export const traverse = (model, visitor) => {
  visitor.prop.apply(model, [model.export(), model.getName()]);

  for (const child of Object.values(model.getChildren())) {
    traverse(child, visitor);
  }
};

export const parseJsonSchema = (jsonSchema) => {
  const parsed = new JsonSchemaModel(jsonSchema);

  traverse(parsed, visitor());

  return parsed.export();
};
