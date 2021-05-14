<template>
  <div>
    <component
      v-for="[name, field, component] of fields"
      :is="component"
      :key="name"
      :name="name"
      :schema="field"
      v-model="localValue[name]"
    />
  </div>
</template>

<script>
import {
  compose,
  curry,
  T,
  eq,
  prop,
  cond,
  constant,
  isPlainObject,
  clone,
  mapValues,
} from "lodash/fp";

export default {
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
      return Object.entries(this.schema.fields).map((entry) => [
        ...entry,
        mapTypeToComponent(entry[1]),
      ]);
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
  beforeCreate() {
    this.$options.components.NxBFormSchemaTextField =
      require("./nx-b-form-schema-fields").NxBFormSchemaTextField;

    this.$options.components.NxBFormSchemaObjectField =
      require("./nx-b-form-schema-fields").NxBFormSchemaObjectField;

    this.$options.components.NxBFormSchemaDatepickerField =
      require("./nx-b-form-schema-fields").NxBFormSchemaDatepickerField;
  },
};

export const equalType = curry((type, value) =>
  compose(eq(type), prop("type"))(value)
);

export const mapTypeToComponent = cond([
  [equalType("object"), constant("NxBFormSchemaObjectField")],
  [equalType("datetime"), constant("NxBFormSchemaDatepickerField")],
  [T, constant("NxBFormSchemaTextField")],
]);

export const createSchemaModel = cond([
  [
    equalType("object"),
    (scheme) => createSchemaModelOnObjectType(scheme.fields),
  ],
  [T, constant(undefined)],
]);

export const createSchemaModelOnObjectType = mapValues((v) =>
  createSchemaModel(v)
);

export const createSchemaModelWithDefault = (schema, defaultValue) =>
  compose(projectDeep(defaultValue), createSchemaModel)(schema);

export const project = curry((source, target) =>
  cond([
    [
      isPlainObject,
      (target) =>
        Object.entries(target).reduce(
          (a, [k, v]) =>
            Object.assign(a, {
              [k]: v ?? (source[k] || {}),
            }),
          {}
        ),
    ],
    [T, constant(source)],
  ])(target)
);

/**
 * Project value on source to target
 *
 * mapValues not work on undefined value
 */
export const projectDeep = curry((source, target) =>
  cond([
    [
      isPlainObject,
      (target) =>
        Object.entries(target).reduce(
          (a, [k, v]) =>
            Object.assign(a, {
              [k]: v ? projectDeep(source[k] || [], v) : source[k],
            }),
          {}
        ),
    ],
    [T, constant(source)],
  ])(target)
);
</script>
