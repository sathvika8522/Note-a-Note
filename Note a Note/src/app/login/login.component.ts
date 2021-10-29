import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngExprService } from '../ang-expr.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:AngExprService ,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(credentials)
  {
     this.us.onlogin(credentials).subscribe
     (
         res=>
         {
            if(res.message==="login success")
            {
              localStorage.setItem('token',res.token)
              localStorage.setItem('username',res.username)
              localStorage.setItem('userobj',res.searchuser)
              this.router.navigateByUrl("/notes")
              this.us.userloginstatus = true
            }
            else
            {
              alert(res.message)
            }
         },
         err=>
         {
             console.log("errrrrrrrrrrr in onLogin function is ",err)
             alert("something went wrong in login")
         }
     )
  }
}
