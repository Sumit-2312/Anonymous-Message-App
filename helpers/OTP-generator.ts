export default function GenerateOTP(): string {
    let OTP = ""; // Initialize OTP as an empty string
    for (let i = 0; i < 6; i++) {
        const num = Math.floor(Math.random() * 10); // Generates a digit (0-9)
        OTP += num.toString(); // Convert num to string and append
    }
    return OTP;
}
