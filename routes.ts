import {Express, Request, Response} from 'express'
import { createUserHandler} from './src/controller/user.controller';
import {validateRequest, requiresUser} from './middleware'
import { createUserSchema, createUserSessionSchema } from './schema/user.schema';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './src/controller/session.controller';
import { createPostSchema, deletePostSchema, updatePostSchema } from './schema/post.schema';
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from './src/controller/post.controller';

export default function(app : Express){
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    // Regiter User
// POST /api/user
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler)

    // Login
// POST /api/sessions
    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

    // Get the user's session
// GET /api/sessions
    app.get('/api/sessions', requiresUser, getUserSessionsHandler);

    // Logout
// DELETE /api/sessions
    app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

// Create a post
    app.post(
        "/api/posts",
        [requiresUser, validateRequest(createPostSchema)],
        createPostHandler
    )

// Update a post
    app.put(
        "/api/posts/:postId",
        [requiresUser, validateRequest(updatePostSchema)],
        updatePostHandler
    )

//  Get a post
    app.get('/api/posts/:postId', getPostHandler)

// Delete a post
    app.delete(
        "/api/posts/:postId",
        [requiresUser, validateRequest(deletePostSchema)],
        deletePostHandler
    )

}

