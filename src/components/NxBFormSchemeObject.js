import { isPlainObject, clone } from "lodash/fp";
import {
  createSchemaModelWithDefault,
  equalType,
  createSchemaField,
} from "../utils";
import NxBFormGroup from "./NxBFormGroup";

const NxBFormSchemeObject = (mapTypeToComponent) => {
  const nxBFormSchemeObject = createSchemaField(NxBFormGroup, {
    render() {
      const children = this.fields
        .map(([name, field]) => [name, field, this.mapTypeToComponent(field)])
        .map(([name, field, SchemaField]) => (
          <SchemaField
            key={name}
            name={name}
            schema={field}
            vModel={this.localValue[name]}
          />
        ));

      return <div>{children}</div>;
    },
    props: {
      name: {},
      schema: {},
      value: {},
    },
    data() {
      return {
        localValue: null,
        cacheValue: null,
      };
    },
    computed: {
      localValueWatch() {
        return isPlainObject(this.localValue)
          ? Object.values(this.localValue)
          : this.localValue;
      },
      fields() {
        return Object.entries(this.schema.fields);
      },
    },
    watch: {
      localValueWatch: {
        handler() {
          this.cacheValue = clone(this.localValue);

          this.$emit("input", this.cacheValue);
        },
      },
      value: {
        handler(value) {
          if (value !== this.cacheValue) {
            this.localValue = createSchemaModelWithDefault(this.schema, value);
          }
        },
        immediate: true,
      },
      schema(schema) {
        this.localValue = createSchemaModelWithDefault(schema, this.value);
      },
    },
    methods: {
      mapTypeToComponent(field) {
        if (equalType("object", field)) {
          return nxBFormSchemeObject;
        }

        return mapTypeToComponent(field);
      },
    },
  });

  return nxBFormSchemeObject;
};

export default NxBFormSchemeObject;
