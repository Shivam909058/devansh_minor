import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Log in to simplify your reading with instant"
      description2="text summarization."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login