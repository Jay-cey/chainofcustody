/**
 * Mocks a server-side session retrieval function.
 * In a real application, this would read a secure cookie or token
 * to get the current user's session data.
 */

interface Session {
  user: {
    id: string
    name: string
  }
}

export async function getSession(): Promise<Session | null> {
  // For development, we always return a mock session.
  return {
    user: {
      id: "officer-jones",
      name: "Officer Jones",
    },
  }
}