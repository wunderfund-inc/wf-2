import {
  required,
  alpha,
  numeric,
  isPhoneNumber,
  alphanumeric,
  overEighteen,
  profileFormState,
  isProfileFormValid,
} from "./form";

describe("form validation", () => {
  describe("required", () => {
    it("valid", () => {
      expect(required("a")).toEqual({ valid: true });
    });
    it("invalid", () => {
      expect(required(null).valid).toBeFalsy();
      expect(required(undefined).valid).toBeFalsy();
    });
  });

  describe("alpha", () => {
    it("valid", () => {
      expect(alpha("asdf")).toEqual({ valid: true });
    });
    it("invalid", () => {
      expect(alpha("1").valid).toBeFalsy();
      expect(alpha("*").valid).toBeFalsy();
      expect(alpha("+").valid).toBeFalsy();
    });
  });

  describe("numeric", () => {
    it("valid", () => {
      expect(numeric("12300590")).toEqual({ valid: true });
    });
    it("invalid", () => {
      expect(numeric("asdf").valid).toBeFalsy();
      expect(numeric("*").valid).toBeFalsy();
      expect(numeric("+").valid).toBeFalsy();
      expect(numeric(" ").valid).toBeFalsy();
      expect(numeric("-").valid).toBeFalsy();
      expect(numeric(".").valid).toBeFalsy();
    });
  });

  describe("phone number", () => {
    it("valid", () => {
      expect(isPhoneNumber("444444444")).toEqual({ valid: true });
      expect(isPhoneNumber("444-444-4444")).toEqual({ valid: true });
      expect(isPhoneNumber("61-222-444-4444")).toEqual({ valid: true });
    });
    it("invalid", () => {
      expect(isPhoneNumber("4444444").valid).toBeFalsy();
      expect(isPhoneNumber("(444) 444-4444").valid).toBeFalsy();
      expect(isPhoneNumber("444 444 4444").valid).toBeFalsy();
    });
  });

  describe("alphanumeric", () => {
    it("valid", () => {
      expect(alphanumeric("1100 Sycamore Avenue").valid).toBeTruthy();
    });
    it("invalid", () => {
      expect(alphanumeric("").valid).toBeFalsy();
      expect(alphanumeric("+1100 Sycamore Avenue").valid).toBeFalsy();
    });
  });

  describe("over eighteen years of age", () => {
    it("valid", () => {
      expect(overEighteen("2000-01-01").valid).toBeTruthy();
    });
    it("invalid", () => {
      expect(overEighteen("2020-01-01").valid).toBeFalsy();
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

    it("all valid", () => {
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
      expect(
        profileFormState({
          ...form,
          street2: "",
        }).street2.valid
      ).toBeTruthy();
    });

    it("some valid", () => {
      expect(
        profileFormState({
          ...form,
          firstName: "",
        }).firstName.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          lastName: "",
        }).lastName.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          dob: "",
        }).dob.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          phone: "",
        }).phone.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          street1: "",
        }).street1.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          city: "",
        }).city.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          postal: "",
        }).postal.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          state: "NOUS",
          country: "USA",
        })
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
        profileFormState({
          ...form,
          state: "N/A",
          country: "USA",
        }).state.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          state: "NOUS",
          country: "AAA",
        }).country.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          state: "OH",
          country: "AAA",
        }).country.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          state: "",
        }).state.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          country: "",
        }).country.valid
      ).toBeFalsy();
      expect(
        profileFormState({
          ...form,
          dob: "",
        }).dob.valid
      ).toBeFalsy();
    });
  });

  describe("profile form state", () => {
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

    it("valid", () => {
      expect(isProfileFormValid(formState)).toEqual(true);
    });

    it("invalid", () => {
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
});
