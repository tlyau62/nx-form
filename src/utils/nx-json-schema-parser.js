import { mapValues, omit, omitBy, isArray } from "lodash";

export const visitor = () => ({
  prop(prop) {
    debugger;
    this.value(
      {
        type: isArray(prop.type) ? prop.type[0] : prop.type,
        label: prop.title,
        required: prop.required,
        fields: prop.properties,
      },
      "fields"
    );
  },
});

export class JsonSchemaModel {
  constructor(value) {
    this._value = null;
    this._propKey = null;
    this._children = null;

    this.value(value, "properties");
  }

  value(value, propKey = "properties") {
    if (value === undefined) {
      return this._value;
    }

    this.propKey(propKey);
    this.children(
      mapValues(value[propKey] || {}, (prop) => new JsonSchemaModel(prop))
    );
    this._value = omitBy(value, (value) => value === undefined);
    this._value = omit(value, propKey);
  }

  propKey(propKey) {
    if (propKey === undefined) {
      return this._propKey;
    }

    this._propKey = propKey;
  }

  children(children) {
    if (children === undefined) {
      return this._children;
    }

    this._children = children;
  }

  get hasChildren() {
    return Object.keys(this._children).length > 0;
  }

  export() {
    return {
      ...this.value(),
      [this.propKey()]: mapValues(this.children(), (child) => child.export()),
    };
  }
}

export const traverse = (model, visitor) => {
  visitor.prop.call(model, model.value());

  for (const child of Object.values(model.children())) {
    traverse(child, visitor);
  }
};

export const parseJsonSchema = (jsonSchema) => {
  const parsed = new JsonSchemaModel(jsonSchema);

  traverse(parsed, visitor());

  return {
    root: parsed.export(),
  };
};
