import { Router } from 'express';

import { getAuthorizationUrl, authCallbackMiddleware, authRefreshMiddleware, getUserProfile } from '../services/aps.js';

const router = Router();

router.get('/api/auth/login', function (req, res) {
    const AutoDeskUrl = getAuthorizationUrl()
    console.log(AutoDeskUrl);
    res.redirect(AutoDeskUrl);
});

router.get('/api/auth/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});

router.get('/api/auth/callback', authCallbackMiddleware, function (req, res) {
    res.redirect('/');
});

router.get('/api/auth/profile', authRefreshMiddleware, async function (req, res, next) {
    try {
        const profile = await getUserProfile(req.oAuthToken);
        res.json({ name: `${profile.name}` });
    } catch (err) {
        next(err);
    }
});

export default router;
