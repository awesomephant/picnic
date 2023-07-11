import React from "react"
import "./css/ContactForm.css"

export default function ContactForm(props) {
  return (
    <div className="contactForm">
      <form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name
            <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <button class="button" type="submit">
            Send
          </button>
        </p>
      </form>
    </div>
  )
}
