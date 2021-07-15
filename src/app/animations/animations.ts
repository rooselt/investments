import { trigger, animate, transition, style, query } from '@angular/animations';

export const routeSlide = trigger('routeSlide', [
    transition('* => *', [
        query(':enter', [style({ opacity: 0, transform: 'translateX(50px)' })], { optional: true }),
        query(
            ':leave',
            [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0, transform: 'translateX(-50px)' }))],
            { optional: true },
        ),
        query(':enter', [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1, transform: 'translateX(0)' }))], {
            optional: true,
        }),
    ]),
]);

export const fade = trigger('fade', [
    transition(':enter', [
        style({
            opacity: 0,
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 1,
            }),
        ),
    ]),
    transition(':leave', [
        style({
            position: 'absolute',
            opacity: 1,
        }),
        animate(
            '.3s ease-in-out',
            style({
                position: 'absolute',
                opacity: 0,
            }),
        ),
    ]),
]);

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({
            opacity: 0,
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 1,
            }),
        ),
    ]),
]);

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({
            opacity: 0,
        }),
        animate(
            '.3s ease',
            style({
                opacity: 1,
            }),
        ),
    ]),

    transition(':leave', [
        style({
            opacity: 1,
        }),
        animate(
            '.3s ease',
            style({
                opacity: 0,
            }),
        ),
    ]),
]);

export const eventFade = trigger('eventFade', [
    transition('void => prev', [
        style({
            opacity: 0,
            position: 'absolute',
            top: 0,
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 1,
                position: 'absolute',
                top: 0,
            }),
        ),
        animate(
            '.2s ease-in-out',
            style({
                opacity: 1,
                position: 'absolute',
                top: 0,
            }),
        ),
    ]),

    transition('prev => void', [
        style({
            opacity: 1,
            position: 'absolute',
            top: 0,
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 0,
                position: 'absolute',
                top: 0,
            }),
        ),
    ]),

    transition('void => next', [
        style({
            opacity: 0,
            position: 'absolute',
            top: 0,
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 1,
                position: 'absolute',
                top: 0,
            }),
        ),
        animate(
            '.2s ease-in-out',
            style({
                opacity: 1,
                position: 'absolute',
                top: 0,
            }),
        ),
    ]),

    transition('next => void', [
        style({
            opacity: 1,
            position: 'absolute',
            top: 0,
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 0,
                position: 'absolute',
                top: 0,
            }),
        ),
    ]),
]);

export const slide = trigger('slide', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(100px)',
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 1,
                transform: 'translateX(0)',
            }),
        ),
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0)',
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 0,
                transform: 'translateX(100px)',
            }),
        ),
    ]),
]);

export const drop = trigger('drop', [
    transition(':enter', [
        style({
            opacity: 0,
            height: 0,
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 1,
                height: '200px',
            }),
        ),
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            height: '200px',
        }),
        animate(
            '.3s ease-in-out',
            style({
                opacity: 0,
                height: 0,
            }),
        ),
    ]),
]);
