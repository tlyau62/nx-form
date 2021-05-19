import { v4 as uuidv4 } from "uuid";

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
      default: `field-${uuidv4()}`,
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
