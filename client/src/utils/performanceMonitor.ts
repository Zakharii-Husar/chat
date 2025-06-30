// Performance monitoring utility
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private startTimes: Map<string, number> = new Map();

  // Start timing an operation
  startTimer(operation: string): void {
    this.startTimes.set(operation, performance.now());
  }

  // End timing an operation and record the duration
  endTimer(operation: string): number {
    const startTime = this.startTimes.get(operation);
    if (!startTime) {
      console.warn(`No start time found for operation: ${operation}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.startTimes.delete(operation);

    // Store the metric
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    this.metrics.get(operation)!.push(duration);

    // Log slow operations
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${operation} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  // Get average time for an operation
  getAverageTime(operation: string): number {
    const times = this.metrics.get(operation);
    if (!times || times.length === 0) return 0;
    
    const sum = times.reduce((acc, time) => acc + time, 0);
    return sum / times.length;
  }

  // Get all metrics
  getMetrics(): Record<string, { average: number; count: number; min: number; max: number }> {
    const result: Record<string, { average: number; count: number; min: number; max: number }> = {};
    
    const entries = Array.from(this.metrics.entries());
    for (const [operation, times] of entries) {
      const min = Math.min(...times);
      const max = Math.max(...times);
      const average = this.getAverageTime(operation);
      
      result[operation] = {
        average,
        count: times.length,
        min,
        max
      };
    }
    
    return result;
  }

  // Clear all metrics
  clear(): void {
    this.metrics.clear();
    this.startTimes.clear();
  }

  // Log performance summary
  logSummary(): void {
    const metrics = this.getMetrics();
    console.group('Performance Summary');
    
    for (const [operation, data] of Object.entries(metrics)) {
      console.log(`${operation}:`, {
        avg: `${data.average.toFixed(2)}ms`,
        count: data.count,
        min: `${data.min.toFixed(2)}ms`,
        max: `${data.max.toFixed(2)}ms`
      });
    }
    
    console.groupEnd();
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Convenience functions
export const startTimer = (operation: string) => performanceMonitor.startTimer(operation);
export const endTimer = (operation: string) => performanceMonitor.endTimer(operation);
export const logPerformance = () => performanceMonitor.logSummary(); 