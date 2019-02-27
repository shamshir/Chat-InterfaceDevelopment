import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type.enum';
import { Alert } from '../../classes/alert';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    this.createForm();

  }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  ngOnDestroy() {

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /* Create the fields of the form */
  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /* Submit the form data to the database */
  public submit(): void {

    if (this.signupForm.valid) {

      /* Display loading screen and obtain form values */
      this.loadingService.isLoading.next(true);
      const { firstName, lastName, email, password } = this.signupForm.value;

      /* Validate the values and act accordingly */
      this.subscriptions.push(
        this.auth.signup(firstName, lastName, email, password).subscribe(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl); // Validation Success -> Go to /chat
          }
          this.loadingService.isLoading.next(false);
        })
      );
    } else {

      /* Display Alert */
      const failedSignupAlert = new Alert('Your email or password is not valid, try again.', AlertType.Danger);

      this.loadingService.isLoading.next(false);

      this.alertService.alerts.next(failedSignupAlert);
    }
  }


}
