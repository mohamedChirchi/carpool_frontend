import { trigger, state, style, animate, transition } from '@angular/animations';

export const tabAnimation = trigger('tabAnimation', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [animate('0.6s ease-in-out')]),
]);
