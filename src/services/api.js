const API_URL = 'http://localhost:5000/api';

/**
 * Sends user slider preferences to the backend and retrieves the slider quiz results from the backend.
 */
export async function getSliderQuizResults(values) {
  try {
    const response = await fetch(`${API_URL}/get_slider_quiz_results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    return { error: error.message || 'Network error' };
  }
}
