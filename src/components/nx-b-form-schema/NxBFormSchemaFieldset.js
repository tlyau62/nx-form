import { isPlainObject, clone, memoize } from "lodash/fp";
import { createSchemaModelWithDefault, equalType } from "../../utils";
import fieldMixin from "../../mixins/field.mixin";
import { withSchemaGroup } from "../nx-b-form-schema-group";

const NxBFormSchemaFieldset = (mapTypeToComponent) => {
  const memoizeNxBFormSchemaGroup = memoize((component, NxBFormSchemaObject) =>
    withSchemaGroup(component, NxBFormSchemaObject)
  );

  const NxBFormSchemaField = (() => ({
    mixins: [fieldMixin],
    render() {
      const Component = this.getComponent();

      return (
        <Component
          name={this.name}
          schema={this.schema}
          value={this.value}
          on={{ input: this.$listeners.input }}
        />
      );
    },
    methods: {
      getComponent() {
        const schema = this.schema;
        const component = mapTypeToComponent(schema);

        if (equalType("object", schema)) {
          return memoizeNxBFormSchemaGroup(component, NxBFormSchemaObject); // create field here will cause inifinite recursion, please check form-field-inf-recur branch
        }

        return component;
      },
    },
  }))();

  const NxBFormSchemaObject = (() => ({
    mixins: [fieldMixin],
    components: {
      NxBFormSchemaField,
    },
    render() {
      const children = this.properties.map(([name, field]) => (
        <NxBFormSchemaField
          key={name}
          name={name}
          schema={field}
          vModel={this.localValue[name]}
        />
      ));

      return <div>{children}</div>;
    },
    data() {
      return {
        localValue: {},
        cacheValue: {},
      };
    },
    computed: {
      localValueWatch() {
        return isPlainObject(this.localValue)
          ? Object.values(this.localValue)
          : this.localValue;
      },
      properties() {
        return Object.entries(this.schema.properties);
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
    NxBFormSchemaFieldset: NxBFormSchemaField,
    NxBFormSchemaObject,
  };
};

export default NxBFormSchemaFieldset;
