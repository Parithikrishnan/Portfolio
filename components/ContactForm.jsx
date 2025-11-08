// ContactForm.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha"; 

function ContactForm({ onClose, onSuccess }) {
  const [state, handleSubmit] = useForm("mgvpgbrw");
  const recaptchaRef = useRef(null); 
  const [recaptchaValue, setRecaptchaValue] = useState(null); 

  useEffect(() => {
    if (state.succeeded) {
      onSuccess();
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaValue(null); 
    }
  }, [state.succeeded, onSuccess]);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const onSubmit = async (event) => {
    await handleSubmit(event);
  };

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="your.email@example.com"
          required
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message here..."
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      {/* reCAPTCHA component */}
      <div className="form-group" style={{ marginTop: '15px' }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LcfjwUsAAAAAAM2RERXBzxMjBLIo6Ew5Aa4V0xF"
          onChange={handleRecaptchaChange}
        />
        {state.errors && state.errors.filter(e => e.field === '_recaptcha').length > 0 && (
          <p style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>
            Please complete the CAPTCHA.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state.submitting || !recaptchaValue} 
        className="submit-btn"
        style={{ marginTop: '20px' }}
      >
        <Send size={20} />
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;