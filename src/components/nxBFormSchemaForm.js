import { isPlainObject, clone } from "lodash/fp";
import { createSchemaModelWithDefault, equalType } from "../utils";

const nxBFormSchemaForm = (mapTypeToComponent) => {
  const NxBFormSchemaField = (() => ({
    render() {
      const Component = this.mapTypeToComponent();

      return (
        <Component
          key={this.name}
          name={this.name}
          schema={this.schema}
          value={this.value}
          on={{ ...this.$listeners }}
        />
      );
    },
    props: {
      name: {},
      schema: {},
      value: {},
    },
    methods: {
      mapTypeToComponent() {
        const field = this.schema;

        if (equalType("object", field)) {
          return NxBFormSchemeObject;
        }

        return mapTypeToComponent(field);
      },
    },
  }))();

  const NxBFormSchemeObject = (() => ({
    components: {
      NxBFormSchemaField,
    },
    render() {
      const children = this.fields.map(([name, field]) => (
        <NxBFormSchemaField
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
  }))();

  return {
    NxBFormSchemaForm: NxBFormSchemaField,
    NxBFormSchemeObject,
  };
};

export default nxBFormSchemaForm;
