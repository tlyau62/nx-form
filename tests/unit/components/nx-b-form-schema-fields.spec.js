import { NxBFormSchemaForm } from "@/components/nx-b-form-schema-fields";
import { mount } from "@vue/test-utils";
import "@/validations";
import { isPlainObject, cloneDeep } from "lodash";

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

    it("creates a string field with default value and output a string from a string schema", async () => {
      const schema = {
        type: "string",
      };

      const wrapper = mount(createWrapper("address", schema, "123456"));
      const field = wrapper.find(`input[name='address']`);

      expect(field.exists()).toBe(true);

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.form).toBe("123456");
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

    it("creates a object field with default value and output a object with a object schema", async () => {
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

      const defaultValue = {
        blue: "blue",
        black: {
          darkBlack: "testtest",
          dateBlack: "02-07-1999",
        },
      };

      const wrapper = mount(createWrapper("color", schema, defaultValue));

      await wrapper.vm.$nextTick();

      expect(isPlainObject(wrapper.vm.form)).toBe(true);
      expect(wrapper.vm.form).toEqual(cloneDeep(defaultValue));
    });

    it("does not modify any object in v-model", async () => {
      const schema = {
        type: "object",
        fields: {
          person: {
            type: "string",
          },
          loveColor: {
            type: "object",
            fields: {
              color1: {
                type: "string",
              },
              color2: {
                type: "object",
                fields: {
                  color2A: {
                    type: "string",
                  },
                  color2B: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      };

      const defaultValue = {
        person: "peter",
        loveColor: {
          color1: "black",
          color2: {
            color2A: "black",
            color2B: "blue",
          },
        },
      };

      // make sure formValue is not modified
      const formValue = cloneDeep(defaultValue);

      const wrapper = mount(createWrapper("color1", schema, formValue));

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.form).not.toBe(formValue);
      expect(wrapper.vm.form).toEqual(formValue);

      // make sure color2 is not clone, but loveColor is cloned
      let field = null;
      let person = wrapper.vm.form;
      let clonePerson = cloneDeep(person);

      field = wrapper.find(`input[name='color1']`);

      field.element.value = `dark blue`;
      field.trigger("input");

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.form).not.toBe(person);
      expect(wrapper.vm.form.loveColor).not.toBe(person.loveColor);
      expect(wrapper.vm.form.loveColor.color2).toBe(person.loveColor.color2);
      expect(person).toEqual(clonePerson);
    });
  });
});
