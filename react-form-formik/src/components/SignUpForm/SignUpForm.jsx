import React from 'react';
import { useFormik }   from 'formik';
import * as yup from 'yup';
import './SignUpForm.css';

export default function SignUpForm() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }, 
        validationSchema: yup.object({
            firstName: yup.string()
            .required('Le prénom est requis')
            .matches(/^[A-Za-z]+$/, 'Le prénom doit contenir que des lettres'),
            lastName: yup.string()
            .required('Le nom est requis')
            .matches(/^[A-Za-z]+$/, 'Le nom doit contenir que des lettres'),
            email: yup.string().email('Adresse email invalide').required('L\'adresse email est requise'),
            password: yup.string()
            .required('Le mot de passe est requis')
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
            .matches(/(?=.*[0-9])/, 'Le mot de passe doit contenir au moins un chiffre')
            .matches(/(?=.*[A-Za-z])/, 'Le mot de passe doit contenir au moins une lettre'),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
        }),
        onSubmit: values => {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
        }, 

    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">Prénom</label>
            <input 
                type = "text" 
                id = "firstName"
                name = "firstName"
                onChange = {formik.handleChange}
                onBlur = {formik.handleBlur}
                value = {formik.values.firstName}
                />
            {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
            <label htmlFor="lastName">Nom</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
            <button type="submit">S'inscrire</button>
            </form>
    )
}
