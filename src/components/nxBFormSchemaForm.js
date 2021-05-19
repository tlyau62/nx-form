import { isPlainObject, clone, memoize } from "lodash/fp";
import { createSchemaModelWithDefault, equalType } from "../utils";
import fieldMixin from "../mixins/field.mixin";
import NxBFormSchemaGroup from "./NxBFormSchemaGroup";

const NxBFormSchemaForm = (mapTypeToComponent) => {
  const memoizeNxBFormSchemaGroup = memoize((component, NxBFormSchemeObject) =>
    NxBFormSchemaGroup(component, NxBFormSchemeObject)
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
          return memoizeNxBFormSchemaGroup(component, NxBFormSchemeObject); // create field here will cause inifinite recursion, please check form-field-inf-recur branch
        }

        return component;
      },
    },
  }))();

  const NxBFormSchemeObject = (() => ({
    mixins: [fieldMixin],
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

export default NxBFormSchemaForm;
