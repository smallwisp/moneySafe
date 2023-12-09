
const API_URL = 'https://instinctive-ambitious-pick.glitch.me/api'

export const getData = async(url) => {
  try {
    const response = await fetch(`${API_URL}${url}`)
    if (!response.ok) {
      throw new Error('HTTP error status:', response.status)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error
  }
};

// export default getData