import {useState} from "react";

export default function  () {
    let [formState, setFormState] = useState({login:'',password:''});
    let {login, password} = formState;

    const change = (e) =>  {

        let name = e.target.name;
        console.log(name);
        let value = e.target.value;
        setFormState({...formState,[name]:value})
    }

    const submit = (e) => {
        e.preventDefault()
    }

    return (
         <div>
             <form>
                 <input type="text" name={'login'} value={login} onChange={change}/>
                 <input type="text" name={'password'} value={password} onChange={change}/>
                 <button>send</button>

             </form>
         
         
         </div>
    )
}