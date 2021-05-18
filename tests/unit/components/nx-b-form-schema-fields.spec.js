import { NxBFormSchemaForm } from "@/components/nx-b-form-schema-fields";
import { mount } from "@vue/test-utils";
import "@/validations";
import { isPlainObject } from "lodash";

describe("nx-b-form-schema-fields.js", () => {
  describe("NxBFormSchemaForm", function () {
    const createWrapper = (name, schema, form) => {
      return {
        data() {
          return { form, schema, name };
        },
        components: { NxBFormSchemaForm },
        render() {
          return (
            <NxBFormSchemaForm
              ref="schemaForm"
              name={name}
              vModel={this.form}
              schema={schema}
            />
          );
        },
      };
    };

    it("creates a string field and output a string from a string schema", async () => {
      const schema = {
        type: "string",
      };

      const wrapper = mount(createWrapper("address", schema, null));
      const field = wrapper.find(`input[name='address']`);

      expect(field.exists()).toBe(true);

      field.element.value = `testtest`;
      field.trigger("input");

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.form).toBe("testtest");
    });

    it("logs the error when the given value is object but the schema type is string", async () => {
      const schema = {
        type: "string",
      };

      const consoleMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {
          if (consoleMock.mock.calls.length === 3) {
            consoleMock.mockRestore();
          }
        });
      const wrapper = mount(createWrapper("address", schema, {}));

      await wrapper.vm.$nextTick();
      await wrapper.vm.$refs.schemaForm.$nextTick();

      expect(consoleMock).toHaveBeenCalled();
    });

    it("creates a object field and output a object with a object schema", async () => {
      const schema = {
        type: "object",
        label: "colour",
        fields: {
          blue: {
            type: "string",
            label: "Blue",
          },
          black: {
            type: "object",
            label: "Black",
            fields: {
              darkBlack: {
                type: "string",
                label: "Dark Black",
              },
              dateBlack: {
                type: "string",
                format: "date-time",
                label: "Date Black",
              },
            },
          },
        },
      };

      const wrapper = mount(createWrapper("color", schema, {}));

      const blueField = wrapper.find(`input[name='blue']`);
      const darkBlackField = wrapper.find(`input[name='darkBlack']`);
      const dateBlackField = wrapper.find(`input[name='dateBlack']`);

      expect(blueField.exists()).toBe(true);
      expect(darkBlackField.exists()).toBe(true);
      expect(dateBlackField.exists()).toBe(true);

      blueField.element.value = `blueValue`;
      blueField.trigger("input");

      darkBlackField.element.value = `darkBlackValue`;
      darkBlackField.trigger("input");

      dateBlackField.element.value = `02-02-1999`;
      dateBlackField.trigger("input");

      await wrapper.vm.$nextTick();

      expect(isPlainObject(wrapper.vm.form)).toBe(true);
      expect(wrapper.vm.form).toEqual({
        blue: "blueValue",
        black: {
          dateBlack: "02-02-1999",
          darkBlack: "darkBlackValue",
        },
      });
    });
  });
});
