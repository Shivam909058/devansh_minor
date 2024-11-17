import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join us today!"
      description1=""
      description2="Sign up to start summarizing your text effortlessly."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup