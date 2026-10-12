# BreatheCode Authentication for First-Party 4Geeks Apps

## Overview

This guide explains how to integrate authentication for applications owned and operated by 4Geeks. First-party apps have direct access to BreatheCode's authentication APIs without complex OAuth app registration.

## Authentication Methods

### 1. Email & Password Login

**Endpoint:**
```
POST /v1/auth/login/
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response (200 OK):**
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "user_id": 123,
  "email": "user@example.com",
  "expires_at": null
}
```

**Error (401 Unauthorized):**
```json
{
  "detail": "Unable to log in with provided credentials.",
  "status_code": 401
}
```

### 2. GitHub Single Sign-On (SSO)

**Step 1: Redirect to GitHub Login**
```
GET /v1/auth/github?url=<base64-encoded-callback-url>
```

**Parameters:**
- `url` (required): Base64-encoded URL where user will be redirected after auth
- `scope` (optional): GitHub scopes (default: `user:email`)

**Example:**
```javascript
// JavaScript
const callback = btoa('https://your-app.com/auth/callback');
const loginUrl = `https://api.breatheco.de/v1/auth/github?url=${callback}`;
window.location.href = loginUrl;
```

```python
# Python
import base64
callback = base64.b64encode(b'https://your-app.com/auth/callback').decode()
login_url = f'https://api.breatheco.de/v1/auth/github?url={callback}'
# Redirect user to login_url
```

**Step 2: Handle Callback**

After successful GitHub authentication, user is redirected to:
```
https://your-app.com/auth/callback?token=9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**Query Parameters:**
- `token`: BreatheCode authentication token (ready to use!)

### 3. Google Single Sign-On (SSO)

**Step 1: Redirect to Google Login**
```
GET /v1/auth/google?url=<base64-encoded-callback-url>
```

**Parameters:**
- `url` (required): Base64-encoded callback URL

**Example:**
```javascript
const callback = btoa('https://your-app.com/auth/callback');
window.location.href = `https://api.breatheco.de/v1/auth/google?url=${callback}`;
```

**Step 2: Handle Callback**

Same as GitHub - receives `token` query parameter:
```
https://your-app.com/auth/callback?token=9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

## Using the Token

### Making Authenticated Requests

All authenticated API requests use the token in the `Authorization` header:

```bash
curl -H "Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b" \
  https://api.breatheco.de/v1/auth/user/me
```

**JavaScript/Fetch:**
```javascript
const response = await fetch('https://api.breatheco.de/v1/auth/user/me', {
  headers: {
    'Authorization': `Token ${token}`
  }
});
const user = await response.json();
```

**Python/requests:**
```python
import requests

headers = {'Authorization': f'Token {token}'}
response = requests.get('https://api.breatheco.de/v1/auth/user/me', headers=headers)
user = response.json()
```

## Key Endpoints

### Get Current User

**Endpoint:**
```
GET /v1/auth/user/me
```

**Headers:**
```
Authorization: Token <user-token>
```

**Response (200 OK):**
```json
{
  "id": 123,
  "email": "aalejo@gmail.com",
  "username": "aalejo@gmail.com",
  "first_name": "Alejandro",
  "last_name": "Sanchez",
  "date_joined": "2022-10-12T20:42:55.827Z",
  "github": {
    "avatar_url": "https://avatars.githubusercontent.com/u/123456",
    "name": "Alejandro Sanchez",
    "username": "aalejosan"
  },
  "profile": {
    "avatar_url": "https://avatars.githubusercontent.com/u/123456"
  },
  "roles": [
    {
      "id": 1,
      "academy": {
        "id": 1,
        "slug": "downtown-miami",
        "name": "4Geeks Academy Miami"
      },
      "cohort": null,
      "role": {
        "slug": "admin",
        "name": "Admin"
      },
      "created_at": "2022-10-12T21:59:33.999Z"
    }
  ],
  "permissions": [
    {
      "codename": "read_my_academy",
      "name": "Read your academy information"
    },
    {
      "codename": "crud_cohort",
      "name": "Create, update or delete cohort info"
    }
    // ... and many more
  ],
  "settings": {
    "lang": "en",
    "main_currency": "usd"
  }
}
```

**Note:** If user has no GitHub connected, `github` will be `null`. If no profile exists, `profile` will be `null`.

### Get User Profile

**Endpoint:**
```
GET /v1/auth/profile/me
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 123,
    "email": "user@example.com",
    "first_name": "Alejandro",
    "last_name": "Sanchez"
  },
  "avatar_url": "https://avatars.githubusercontent.com/u/123456",
  "bio": "Full-stack developer and educator",
  "phone": "+1234567890",
  "show_tutorial": false,
  "twitter_username": "aalejosan",
  "github_username": "aalejosan",
  "portfolio_url": "https://alejandro.dev",
  "linkedin_url": "https://linkedin.com/in/aalejosan",
  "blog": "https://blog.alejandro.dev"
}
```

### Verify Token

**Endpoint:**
```
GET /v1/auth/token/<token>
```

**Response (200 OK):**
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "token_type": "login",
  "expires_at": null,
  "user": {
    "id": 123,
    "email": "user@example.com",
    "first_name": "Alejandro",
    "last_name": "Sanchez"
  }
}
```

### Logout

**Endpoint:**
```
POST /v1/auth/logout/
```

**Headers:**
```
Authorization: Token <user-token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

This invalidates the token.