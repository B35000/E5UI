export default class WorkerFactory {
  static create(workerFunction) {
    const workerCode = workerFunction.toString();
    const blob = new Blob([`(${workerCode})()`], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    if (typeof Worker === 'undefined') {
      throw new Error('Web Workers are not supported in this environment');
    }
    try {
      const worker = new Worker(workerUrl);
      worker._blobUrl = workerUrl;
      
      // Override terminate to cleanup blob URL
      const originalTerminate = worker.terminate.bind(worker);
      worker.terminate = function() {
        URL.revokeObjectURL(workerUrl);
        originalTerminate();
      };
      
      return worker;
    } catch (error) {
      URL.revokeObjectURL(workerUrl);
      throw error;
    }
  }
}