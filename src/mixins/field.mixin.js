/**
 * Mixin for field
 */
export default {
  props: {
    /**
     * Field name
     */
    name: {
      type: String,
    },

    /**
     * Nextore Schema
     */
    schema: {
      type: Object,
      required: true,
    },

    /**
     * for v-model
     */
    value: {},
  },
};
