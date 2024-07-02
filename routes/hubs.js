import { Router } from 'express';
import { authRefreshMiddleware, getHubs, getProjects } from '../services/aps.js';

const router = Router();

router.use('/api/hubs', authRefreshMiddleware);

router.get('/api/hubs', async function (req, res, next) {
    try {
        const hubs = await getHubs(req.oAuthToken);
        res.json(hubs);
    } catch (err) {
        next(err);
    }
});

router.get('/api/hubs/:hub_id/projects', async function (req, res, next) {
    try {
        const projects = await getProjects(req.params.hub_id, req.oAuthToken);
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

export default router;