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
  mapValues,
  isPlainObject,
  clone,
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
          this.localValue = createSchemaModel(this.schema);
        }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    this.$options.components.NxBFormSchemaTextField =
      require("./nx-b-form-schema-fields").NxBFormSchemaTextField;

    this.$options.components.NxBFormSchemaObjectField =
      require("./nx-b-form-schema-fields").NxBFormSchemaObjectField;
  },
};

export const equalType = curry((type, value) =>
  compose(eq(type), prop("type"))(value)
);

export const mapTypeToComponent = cond([
  [equalType("object"), constant("NxBFormSchemaObjectField")],
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

// export const createModelFromSchemeWithValue = (scheme, value) =>
//   projectDeep(createSchemaModel(scheme), value);

// export const project = (target, source) =>
//   mapValues(target, (v, k) => v ?? source[k]);

// export const projectDeep = (target, source) =>
//   mapValues(target, (v, k) => {
//     if (v) {
//       if (isPlainObject(v)) {
//         return projectDeep(v, source[k] || {});
//       } else {
//         return v;
//       }
//     }
//     return source[k];
//   });
</script>
