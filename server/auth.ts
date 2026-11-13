import { Router } from 'express';

const router = Router();

const BREATHCODE_API_BASE = process.env.BREATHCODE_HOST || 'https://api.breatheco.de';
console.log('[Auth] Using BreathCode API Base:', BREATHCODE_API_BASE);

// Login endpoint - proxies to BreathCode API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        detail: 'Email and password are required',
        status_code: 400 
      });
    }

    const response = await fetch(`${BREATHCODE_API_BASE}/v1/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    // Try to parse JSON response, handle malformed responses
    let data;
    try {
      data = await response.json();
    } catch {
      // If response has no body or is malformed
      return res.status(response.status).json({ 
        detail: 'Invalid response from authentication server',
        status_code: response.status 
      });
    }

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      detail: 'Internal server error',
      status_code: 500 
    });
  }
});

// Get current user - proxies to BreathCode API
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        detail: 'Authentication required',
        status_code: 401 
      });
    }

    const response = await fetch(`${BREATHCODE_API_BASE}/v1/auth/user/me`, {
      headers: {
        'Authorization': authHeader
      }
    });

    // Try to parse JSON response, handle malformed responses
    let data;
    try {
      data = await response.json();
    } catch {
      // If response has no body or is malformed
      return res.status(response.status).json({ 
        detail: 'Invalid response from authentication server',
        status_code: response.status 
      });
    }

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      detail: 'Internal server error',
      status_code: 500 
    });
  }
});

// Logout - proxies to BreathCode API
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        detail: 'Authentication required',
        status_code: 401 
      });
    }

    const response = await fetch(`${BREATHCODE_API_BASE}/v1/auth/logout/`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      }
    });

    // Handle 204 No Content response (successful logout with no body)
    if (response.status === 204) {
      return res.status(204).send();
    }

    // For other responses, try to parse JSON if present
    let data;
    try {
      data = await response.json();
    } catch {
      // If response has no body or is malformed, return generic response
      if (!response.ok) {
        return res.status(response.status).json({ 
          detail: 'Logout failed',
          status_code: response.status 
        });
      }
      return res.status(200).json({ message: 'Logged out successfully' });
    }

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      detail: 'Internal server error',
      status_code: 500 
    });
  }
});

export default router;
