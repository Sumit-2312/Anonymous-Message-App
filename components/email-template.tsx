import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = ({
  username,
  OTP
}:{
    username: string,
    OTP: string
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <p>Thank you for signing up with us.</p>
    <p>Your OTP is: {OTP}</p>
  </div>
);