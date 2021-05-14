import { mapValues, omit, omitBy, isArray } from "lodash";

export const visitor = () => ({
  prop(prop) {
    this.setValue(
      {
        type: isArray(prop.type) ? prop.type[0] : prop.type,
        label: prop.title,
        fields: prop.properties,
      },
      "fields"
    );
  },
});

export class JsonSchemaModel {
  constructor(value) {
    this._value = null;
    this._propKey = "properties";
    this._children = null;

    this.setValue(value, "properties");
  }

  getValue() {
    return this._value;
  }

  setValue(value, propKey) {
    this._value = omitBy(value, (value) => value === undefined);
    this.setChildren(
      mapValues(value[propKey] || {}, (prop) => new JsonSchemaModel(prop))
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
  visitor.prop.call(model, model.export());

  for (const child of Object.values(model.getChildren())) {
    traverse(child, visitor);
  }
};

export const parseJsonSchema = (jsonSchema) => {
  const parsed = new JsonSchemaModel(jsonSchema);

  traverse(parsed, visitor());

  return parsed.export();
};
