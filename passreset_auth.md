## Password Reset/user initialization Strategies

I am working to set up a password reset method. A base mode method is a simple 'reset password' page for users logged into app. New employee accounts would be initialized with a generic password e.g. and "1234" could change their password after logging in. This page is already up and running. However, there is no option for users--even admin--to retrieve or change their password if they forget!

The other method is e-mailing users a link to the reset password page. This is a bit of stretch mode. I can currently send e-mails to users, but need to figure out how to authenticate users, ideally on a temporary basis, and allow users to access the protected password reset page via URL sent in e-mail. I'm giving it until this afternoon to see if i can get traction on this last piece.

I've foudnd two different paths to pursue, and wondering if you have opinions about which might work best.

1) !(This tutorial)[https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7] on password reset e-mails uses a builtin nodejs encryption module (Crypto) to create a time-stamped token and add it to the user table. This token gets emailed to the user in the URL parameters. access to the resetpassword page is restricted unless tokens match.

2) Now that I'm writing this, I think 1) is actually the only strategy I've found. I'd been wondering if i should use passport to generate the token. Do you know of any other directions I should look?

3) Stick to base mode, start working on invoicing? the other rabbit hole I plan to go down is quickbooks API, which I am very confident we can use to at least allow Lisa to populate the app with her current client data. A client data sync function is possible