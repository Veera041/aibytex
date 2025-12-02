// src/utils/formValidation.js

// Generic helpers
export function isEmpty(value) {
  return !value || value.trim() === "";
}

export function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(email || "").trim());
}

// Phone: allow +, digits, spaces, hyphens, parentheses; length 6-20 chars
export function validatePhone(phone) {
  if (!phone) return true; // optional field
  return /^[0-9+\-\s()]{6,20}$/.test(String(phone).trim());
}

export function validateMessage(msg, min = 10) {
  return !!msg && String(msg).trim().length >= min;
}

/**
 * validateContact
 * - form: { name, email, phone, service, budget, message }
 * - services: array of allowed service objects [{value, label}]
 *
 * returns: errors object { fieldName: "error message" }
 */
export function validateContact(form = {}, services = []) {
  const errors = {};

  // Name
  if (isEmpty(form.name)) {
    errors.name = "Name is required.";
  }

  // Email
  if (isEmpty(form.email)) {
    errors.email = "Email is required.";
  } else if (!validateEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }

// Phone (required)
if (isEmpty(form.phone)) {
  errors.phone = "Phone number is required.";
} else if (!validatePhone(form.phone)) {
  errors.phone = "Enter a valid phone number.";
}


  // Service
  const allowedValues = (services || []).map((s) => s.value);
  if (!form.service || !allowedValues.includes(form.service)) {
    errors.service = "Please select a service.";
  }

  // Message
  if (isEmpty(form.message)) {
    errors.message = "Please describe your project.";
  } else if (!validateMessage(form.message, 8)) {
    errors.message = "Message should be at least 8 characters.";
  }

  // Budget - optional but sanitize simple invalid inputs
  if (form.budget && String(form.budget).length > 120) {
    errors.budget = "Budget input is too long.";
  }

  return errors;
}
