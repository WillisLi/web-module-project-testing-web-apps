import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const name = "gi"

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, name);

    const firstNameFeedback = await screen.findByText(/firstName must have at least 5 characters./i);
    expect(firstNameFeedback).toBeInTheDocument(); 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const firstNameError = await screen.findByText(/firstName must have at least 5 characters./i);
    expect(firstNameError).toBeInTheDocument();

    const lastNameError = await screen.findByText(/lastName is a required field./i);
    expect(lastNameError).toBeInTheDocument();

    const emailError = await screen.findByText(/email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = "Bananas"

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, firstName);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const emailError = await screen.findByText(/email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = "Bananas"

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, email);

    const emailError = await screen.findByText(/email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstName = "Bananas"
    const email = "bananas123@gmail.com"

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, email);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const lastNameError = await screen.findByText(/lastName is a required field./i);
    expect(lastNameError).toBeInTheDocument(); 
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = "Bananas"
    const email = "bananas123@gmail.com"

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, firstName);
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, email);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const message = screen.queryByText(/Message:/i);
    expect(message).toBeNull(); 
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = "Bananas"
    const email = "bananas123@gmail.com"

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, firstName);
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, email);

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, firstName);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const firstNames = await screen.findByText(/First Name:/i);
    expect(firstNames).toBeInTheDocument(); 

    const lastName = await screen.findByText(/Last Name:/i);
    expect(lastName).toBeInTheDocument(); 

    const emails = await screen.findByText(/Email:/i);
    expect(emails).toBeInTheDocument(); 

    const message = await screen.findByText(/message:/i);
    expect(message).toBeInTheDocument(); 
});