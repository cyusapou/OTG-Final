import { ref, computed, onUnmounted } from 'vue'
import { nearestPoint } from '@turf/turf'
import { point, featureCollection } from '@turf/helpers'
import { stations } from '../data/stations.js'

export function useNearestStation() {
  const isLoading = ref(false)
  const error = ref(null)
  const userLocation = ref(null)
  const nearestStation = ref(null)
  const distance = ref(null)
  
  // Real-time tracking
  const isTracking = ref(false)
  const trackingInterval = ref(null)
  const lastUpdateTime = ref(null)

  // Check if geolocation is available
  const isGeolocationAvailable = computed(() => {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator
  })

  // Get current user location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!isGeolocationAvailable.value) {
        const errorMsg = 'Geolocation is not available in your browser'
        error.value = errorMsg
        reject(new Error(errorMsg))
        return
      }

      isLoading.value = true
      error.value = null

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // 1 minute
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date()
          }

          userLocation.value = location
          isLoading.value = false
          resolve(location)
        },
        (err) => {
          isLoading.value = false
          let errorMessage = 'Failed to get your location'
          
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.'
              break
            case err.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.'
              break
            case err.TIMEOUT:
              errorMessage = 'Location request timed out.'
              break
          }

          error.value = errorMessage
          reject(new Error(errorMessage))
        },
        options
      )
    })
  }

  // Find nearest station using Turf.js
  const findNearestStation = (location) => {
    if (!location || !stations.length) {
      return {
        station: null,
        distance: null,
        error: 'No location or stations available'
      }
    }

    try {
      const userPoint = point([location.lng, location.lat])
      const stationPoints = stations.map(station => 
        point([station.lng, station.lat], { station })
      )
      
      const collection = featureCollection(stationPoints)
      const nearest = nearestPoint(userPoint, collection)
      
      const nearestStationData = nearest.properties.station
      const distanceInKm = nearest.properties.distance * 111.32 // Convert degrees to km (approximate)

      return {
        station: nearestStationData,
        distance: distanceInKm,
        error: null
      }
    } catch (err) {
      console.error('Error finding nearest station:', err)
      return {
        station: null,
        distance: null,
        error: 'Failed to find nearest station'
      }
    }
  }

  // Get nearest station
  const getNearestStation = async () => {
    try {
      isLoading.value = true
      error.value = null

      const location = await getCurrentLocation()
      const result = findNearestStation(location)

      nearestStation.value = result.station
      distance.value = result.distance
      error.value = result.error

      return result
    } catch (err) {
      error.value = err.message
      return {
        station: null,
        distance: null,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // Start real-time tracking
  const startRealTimeTracking = (intervalMs = 30000) => { // Default 30 seconds
    if (isTracking.value) return

    isTracking.value = true
    
    // Initial location fetch
    getNearestStation()

    // Set up interval for updates
    trackingInterval.value = setInterval(() => {
      getNearestStation()
    }, intervalMs)

    console.log(`Started real-time tracking with ${intervalMs}ms interval`)
  }

  // Stop real-time tracking
  const stopRealTimeTracking = () => {
    if (trackingInterval.value) {
      clearInterval(trackingInterval.value)
      trackingInterval.value = null
    }
    
    isTracking.value = false
    console.log('Stopped real-time tracking')
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stopRealTimeTracking()
  })

  return {
    // State
    isLoading,
    error,
    userLocation,
    nearestStation,
    distance,
    isTracking,
    lastUpdateTime,
    
    // Computed
    isGeolocationAvailable,
    
    // Methods
    getCurrentLocation,
    findNearestStation,
    getNearestStation,
    startRealTimeTracking,
    stopRealTimeTracking
  }
}
