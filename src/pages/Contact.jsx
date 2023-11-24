import React, { useRef, useState, Suspense } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
const Contact = () => {
const formRef = useRef(null);
const [form, setForm] = useState({name:'', email:'', message:''});
const [isLoading, setIsLoading] = useState(false);
const [currentAnimation, setCurrentAnimation]= useState('idle')
const {alert, showAlert, hideAlert}= useAlert();
const handleChange = (e) => {
  setForm({ ...form, [e.target.name] : e.target.value })
};
const handleFocus = ()  => setCurrentAnimation('walk');
const handleBlur = ()   => setCurrentAnimation('idle');
const handleSubmit = (e) => {
 
  e.preventDefault();
  setIsLoading(true);
  setCurrentAnimation('hit');
  
  
  emailjs.send(
    import.meta.env.
    VITE_APP_EMAILJS_SERVICE_ID,
    import.meta.env.
    VITE_APP_EMAILJS_TEMPLATE_ID,
    {
      from_name: form.name,
      to_name: "Steven",
      from_email: form.email,
      to_email: 'danteharianjaa@gmail.com',
      message: form.message
    },
    import.meta.env.
    VITE_APP_EMAILJS_PUBLIC_KEY,
  ).then(() => {
    setIsLoading(false);
    showAlert({show:true, text:'Message sent succesfuly!, type:success'})
    setTimeout(() => {
      hideAlert();
      setCurrentAnimation('idle')
      setForm({name:'', email:'',message:'' });
    })
  }).catch((error) => {
    showAlert({show:true, text:'I didnt receive your message', type:danger})
    setCurrentAnimation('idle');
    setIsLoading(false);
    // TODO:Show error message
  })
};

  return (
    <section className="relative flex lg:flex-row flex-col h-[135vh]">
      <div className="flex-1 min-w-[50%] flex flex-col max-container">
        {alert.show && <Alert {...alert}/>}
        <h1 className="head-text">Get in touch</h1>

        <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit}>
          <label className="font-semibold text-black-500 ">
            Name
            <input
            type="text"
            name="name"
            className="input"
            placeholder="Steven"
            required
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
          </label>
          <label className="font-semibold text-black-500 ">
            Email
            <input
            type="email"
            name="email"
            className="input"
            placeholder="example@gmail.com"
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
          </label>
          <label className="font-semibold text-black-500 ">
            Messages
            <textarea
            name="message"
            rows={4}
            className="textarea"
            placeholder="Your Messages"
            required
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
          </label>
          <button 
          type="submit"
          className="btn"
          disabled={isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          >
            {isLoading ? 'Sending..' : 'Send Message'}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] ">
        <Canvas camera={{
          position:[0,0,5],
          fov:75,
          near: 0.1,
          far:1000
        }}>
          <directionalLight 
          intensity={2.5}
          position={[0, 0, 1]}
          />
          <Suspense fallback={<Loader/>}>
            <Fox
            currentAnimation={currentAnimation}
            position={[0.20, 0.80, 0]}
            rotation={[12.5, -0.6, 0]}
            scale={[0.4, 0.4, 0.4]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact