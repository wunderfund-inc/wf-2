import {
  required,
  alpha,
  numeric,
  isPhoneNumber,
  alphanumeric,
  overEighteen,
  profileFormState,
  isProfileFormValid,
  isEIN,
} from "./form";

describe("form validation", () => {
  describe("required", () => {
    test("valid", () => {
      expect(required("a").valid).toBeTruthy();
    });
    test("invalid", () => {
      expect(required(null).valid).toBeFalsy();
      expect(required(undefined).valid).toBeFalsy();
    });
  });

  describe("alpha", () => {
    test("valid", () => {
      expect(alpha("asdf")).toEqual({ valid: true });
    });
    test("invalid", () => {
      expect(alpha("1").valid).toBeFalsy();
      expect(alpha("*").valid).toBeFalsy();
      expect(alpha("+").valid).toBeFalsy();
    });
  });

  describe("numeric", () => {
    test("valid", () => {
      expect(numeric("12300590")).toEqual({ valid: true });
    });
    test("invalid", () => {
      expect(numeric("asdf").valid).toBeFalsy();
      expect(numeric("*").valid).toBeFalsy();
      expect(numeric("+").valid).toBeFalsy();
      expect(numeric(" ").valid).toBeFalsy();
      expect(numeric("-").valid).toBeFalsy();
      expect(numeric(".").valid).toBeFalsy();
    });
  });

  describe("phone number", () => {
    test("valid", () => {
      expect(isPhoneNumber("444444444")).toEqual({ valid: true });
      expect(isPhoneNumber("444-444-4444")).toEqual({ valid: true });
      expect(isPhoneNumber("61-222-444-4444")).toEqual({ valid: true });
    });
    test("invalid", () => {
      expect(isPhoneNumber("4444444").valid).toBeFalsy();
      expect(isPhoneNumber("(444) 444-4444").valid).toBeFalsy();
      expect(isPhoneNumber("444 444 4444").valid).toBeFalsy();
    });
  });

  describe("alphanumeric", () => {
    test("valid", () => {
      expect(alphanumeric("1100 Sycamore Avenue").valid).toBeTruthy();
      expect(alphanumeric("1100 Sycamore Ave.").valid).toBeTruthy();
      expect(alphanumeric("+1100 Sycamore Avenue").valid).toBeTruthy();
    });
    test("invalid", () => {
      expect(alphanumeric("").valid).toBeFalsy();
      expect(alphanumeric("+!@#$%^&*").valid).toBeFalsy();
    });
  });

  describe("over eighteen years of age", () => {
    test("valid", () => {
      expect(overEighteen("2000-01-01").valid).toBeTruthy();
    });
    test("invalid", () => {
      expect(overEighteen("2020-01-01").valid).toBeFalsy();
    });
  });

  describe("is an EIN number", () => {
    test("valid", () => {
      expect(isEIN("01-1234567").valid).toBeTruthy();
      expect(isEIN("91-1144442").valid).toBeTruthy();
      expect(isEIN("011234567").valid).toBeTruthy();
    });
    test("invalid", () => {
      expect(isEIN("123-45-6789").valid).toBeFalsy();
      expect(isEIN("00-1234567").valid).toBeFalsy();
      expect(isEIN("07-1144442").valid).toBeFalsy();
      expect(isEIN("49-1234567").valid).toBeFalsy();
    });
  });

  describe("validating profile form", () => {
    const form = {
      firstName: "Taylor",
      lastName: "Wunder",
      dob: "2000-01-01",
      phone: "513-555-5555",
      street1: "1100 Sycamore Avenue",
      street2: "Floor 7",
      city: "Cincinnati",
      state: "OH",
      country: "USA",
      postal: "45208",
    };

    const entityForm = {
      entityName: "Wunderfund, Inc.",
      entityType: "Corporation",
      ein: "011234567",
      firstName: "Taylor",
      lastName: "Wunder",
      phone: "555-555-5555",
      street1: "1100 Sycamore Avenue",
      street2: "Floor 7",
      city: "Cincinnati",
      state: "OH",
      country: "USA",
      postal: "45208",
    };

    test("all valid", () => {
      expect(profileFormState(form)).toEqual({
        firstName: { valid: true },
        lastName: { valid: true },
        dob: { valid: true },
        phone: { valid: true },
        street1: { valid: true },
        street2: { valid: true },
        city: { valid: true },
        state: { valid: true },
        country: { valid: true },
        postal: { valid: true },
      });
      expect(profileFormState(form, false)).toEqual({
        firstName: { valid: true },
        lastName: { valid: true },
        dob: { valid: true },
        phone: { valid: true },
        street1: { valid: true },
        street2: { valid: true },
        city: { valid: true },
        state: { valid: true },
        country: { valid: true },
        postal: { valid: true },
      });
      expect(
        profileFormState(
          {
            ...form,
            street2: "",
          },
          false
        ).street2.valid
      ).toBeTruthy();
      expect(
        profileFormState(
          {
            ...form,
            street2: null,
          },
          false
        ).street2.valid
      ).toBeTruthy();
      expect(
        profileFormState(
          {
            ...form,
            street2: undefined,
          },
          false
        ).street2.valid
      ).toBeTruthy();
      expect(profileFormState(entityForm, true)).toEqual({
        entityName: { valid: true },
        entityType: { valid: true },
        ein: { valid: true },
        firstName: { valid: true },
        lastName: { valid: true },
        phone: { valid: true },
        street1: { valid: true },
        street2: { valid: true },
        city: { valid: true },
        state: { valid: true },
        country: { valid: true },
        postal: { valid: true },
      });
    });

    test("some valid", () => {
      expect(
        profileFormState(
          {
            ...form,
            firstName: "",
          },
          false
        ).firstName.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            lastName: "",
          },
          false
        ).lastName.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            dob: "",
          },
          false
        ).dob.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            phone: "",
          },
          false
        ).phone.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            street1: "",
          },
          false
        ).street1.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            city: "",
          },
          false
        ).city.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            postal: "",
          },
          false
        ).postal.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            state: "NOUS",
            country: "USA",
          },
          false
        )
      ).toEqual({
        firstName: { valid: true },
        lastName: { valid: true },
        dob: { valid: true },
        phone: { valid: true },
        street1: { valid: true },
        street2: { valid: true },
        city: { valid: true },
        state: { valid: false, message: "Invalid state/country pairing." },
        country: { valid: false, message: "Invalid state/country pairing." },
        postal: { valid: true },
      });
      expect(
        profileFormState(
          {
            ...form,
            state: "N/A",
            country: "USA",
          },
          false
        ).state.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            state: "NOUS",
            country: "AAA",
          },
          false
        ).country.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            state: "OH",
            country: "AAA",
          },
          false
        ).country.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            state: "",
          },
          false
        ).state.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            country: "",
          },
          false
        ).country.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...form,
            dob: "",
          },
          false
        ).dob.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...entityForm,
            entityName: "",
          },
          true
        ).entityName.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...entityForm,
            entityType: "",
          },
          true
        ).entityType.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...entityForm,
            ein: "",
          },
          true
        ).ein.valid
      ).toBeFalsy();
      expect(
        profileFormState(
          {
            ...entityForm,
            entityType: "C-CORP",
          },
          true
        ).entityType.valid
      ).toBeFalsy();
    });
  });

  describe("profile form state (individual)", () => {
    const formState = {
      firstName: { valid: true },
      lastName: { valid: true },
      dob: { valid: true },
      phone: { valid: true },
      street1: { valid: true },
      street2: { valid: true },
      city: { valid: true },
      state: { valid: true },
      country: { valid: true },
      postal: { valid: true },
    };

    test("valid", () => {
      expect(isProfileFormValid(formState)).toEqual(true);
      expect(isProfileFormValid(formState, false)).toEqual(true);
    });

    test("invalid", () => {
      expect(
        isProfileFormValid({
          ...formState,
          firstName: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          lastName: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          dob: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          phone: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          street1: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          city: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          state: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          country: { valid: false, message: "" },
        })
      ).toEqual(false);
      expect(
        isProfileFormValid({
          ...formState,
          postal: { valid: false, message: "" },
        })
      ).toEqual(false);
    });
  });

  describe("profile form state (entity)", () => {
    const formState = {
      entityName: { valid: true },
      entityType: { valid: true },
      ein: { valid: true },
      firstName: { valid: true },
      lastName: { valid: true },
      phone: { valid: true },
      street1: { valid: true },
      street2: { valid: true },
      city: { valid: true },
      state: { valid: true },
      country: { valid: true },
      postal: { valid: true },
    };

    test("valid", () => {
      expect(isProfileFormValid(formState, true)).toEqual(true);
    });

    test("invalid", () => {
      expect(
        isProfileFormValid(
          {
            ...formState,
            entityName: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            entityType: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            ein: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            firstName: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            lastName: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            phone: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            street1: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            city: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            state: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            country: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
      expect(
        isProfileFormValid(
          {
            ...formState,
            postal: { valid: false, message: "" },
          },
          true
        )
      ).toEqual(false);
    });
  });
});
