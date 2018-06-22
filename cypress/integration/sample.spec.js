/// <reference types="cypress" /> 

import Chance from 'chance';
const chance = new Chance();



describe('Firestarter', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    xit('has a title', () => {
        cy.contains('Welcome to Foo');
        expect(2).to.equal(2)
    });

    it('blocks protected routes', () => {

        cy.pause();

        cy.get('#navToggle').click();
        cy.contains('Firestore').click();

        cy.get('notification-message').children()
            .should('contain', 'You must be logged in!')
            .and('be.visible');
    });

    xit('signs up a new user', () => {
        cy.visit('http://localhost:4200');
        cy.get('#navToggle').click();

        cy.contains('Login').click();

        cy.url().should('include', 'login');


        // cy.contains('Already Registered?').click();

        cy.get('input[name=email]').type(chance.email());
        cy.get('input[name=password]').type('ValidPassword23');

        cy.get('button[type=submit]').click();

        cy.contains('Welcome to Firestarter');
    });

    xit('allows user to create notes', () => {
        cy.login()
            // cy.wait(1000)
            // cy.visit('http://localhost:4200');
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





    xit('logs the user out', () => {
        // cy.clock()
        // cy.login()
        // cy.visit('http://localhost:4200/');
        // cy.tick(1000)
        cy.contains('Logout').click();
    });


});