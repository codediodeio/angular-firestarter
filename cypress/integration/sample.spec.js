/// <reference types="cypress" /> 

import Chance from 'chance';
const chance = new Chance();

describe('Firestarter', () => {

    const email = chance.email();
    const pass = 'ValidPassword23';

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('has a title', () => {
        cy.contains('Welcome to Firestarter');
        expect(2).to.equal(2)
    });

    it('blocks protected routes', () => {

        // cy.pause();

        cy.get('#navToggle').click();
        cy.contains('Firestore').click();

        cy.get('notification-message').children()
            .should('contain', 'You must be logged in!')
            .and('be.visible');
    });

    it('signs up a new user', () => {

        // Click Login
        cy.get('#navToggle').click();
        cy.contains('Login').click();

        // Assert URL
        cy.url().should('include', 'login');

        // Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(pass);
        cy.get('button[type=submit]').click();

        // Assert welcome message
        cy.contains('Welcome new user!');
        cy.contains('Logout').click();
    });

    it('allows the user to create notes', () => {

        // Login with custom method
        cy.login(email, pass)

        cy.get('#navToggle').click();
        cy.contains('Firestore').click();

        const noteText = chance.sentence({ words: 5 });
        const noteList = cy.get('main');

        noteList.should('not.contain', noteText);

        // Type text into the note
        cy.get('input[name=note]').type(noteText);
        cy.contains('Add Note').click();

        // Make sure it was created
        const newNote = cy.get('note-detail').first();

        newNote.should('contain', noteText)

        // Delete it
        newNote.find('.is-danger').click();

        // Make sure it was removed from the DOM
        cy.get('notes-list').should('not.contain', noteText);
    });



    it('logs the user out', () => {
        cy.contains('Logout').click();
        cy.get('user-profile').children().should('contain', 'Howdy, GUEST');
    });


});