import { Routes } from '@angular/router';
import { LogComponent } from './log/log.component';
import { RegComponent } from './reg/reg.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './page/home/home.component';
import { LessonComponent } from './page/lesson/lesson.component';
import { EditComponent } from './edit/edit.component';
import { PreviewComponent } from './preview/preview.component';
import { QuizComponent } from './quiz/quiz.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { QuizcreateComponent } from './quizcreate/quizcreate.component';
import { QuizeditComponent } from './quizedit/quizedit.component';
import { ResultsComponent } from './results/results.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/landing', pathMatch: 'full'
    },
    {
        path: 'landing', component: LandingComponent
    },
    {
        path: 'login', component: LogComponent
    },
    {
        path: 'login/:lessid', component: LogComponent
    }, 
    {
        path: 'register', component: RegComponent
    },
    {
        path: 'adminhome/:userid', component: AdminhomeComponent
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [authGuard]
    },
    {
        path: 'home/:userid', component: HomeComponent
    },
    {
        path: 'lesson/:lessid/:userid', component: LessonComponent
    },
    {
        path: 'quiz/:lessid/:userid/:logid', component: QuizComponent
    },
    {
        path: 'results/:quizid/:userid', component: ResultsComponent
    },
    {
        path: 'edit/:lessid', component: EditComponent
    },
    {
        path: 'preview/:lessid', component: PreviewComponent
    },
    {
        path: 'quizcreate/:lessid', component: QuizcreateComponent
    },
    {
        path: 'quizedit/:lessid', component: QuizeditComponent
    }
];
