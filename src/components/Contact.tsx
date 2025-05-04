import React from "react";
import AnimatedSection from "./AnimatedSection";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./Contact.css";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values: ContactFormValues, { resetForm }: FormikHelpers<ContactFormValues>) => {
      // Ở đây bạn có thể tích hợp API gửi email hoặc xử lý theo cách của mình
      alert(`Message sent by ${values.name}`);
      resetForm();
    },
  });

  return (
    <AnimatedSection className="contact">
      <h2>Contact Me</h2>
      <form onSubmit={formik.handleSubmit} className="contact-form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="error">{formik.errors.message}</div>
        ) : null}

        <button type="submit">Send Message</button>
      </form>
    </AnimatedSection>
  );
};

export default Contact;
