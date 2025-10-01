// Пример с таймаутом
AdvancedPromise.timeout(fetch('https://api.example.com/data'), 5000)
    .then(console.log)
    .catch(console.error);

// Пример с очередью
const tasks = [
    () => fetch('/api/1'),
    () => fetch('/api/2'), 
    () => fetch('/api/3'),
    () => fetch('/api/4')
];

AdvancedPromise.queue(tasks, 2) // Максимум 2 параллельных запроса
    .then(console.log)
    .catch(console.error);

class DataProcessor {
    constructor(data, processorFn, options = {}) {
        this.data = data;
        this.processorFn = processorFn;
        this.concurrency = options.concurrency || 1;
        this.retryAttempts = options.retryAttempts || 0;
        this.delay = options.delay || 0;
        
        this.results = [];
        this.stats = {
            total: data.length,
            successful: 0,
            failed: 0,
            retries: 0
        };
        
        this.currentIndex = 0;
        this.running = 0;
        this.isPaused = false;
        this.resolve = null;
        this.reject = null;
    }

    async processWithRetry(item, index, attempts = 0) {
        try {
            const result = await this.processorFn(item, index);
            this.results[index] = { status: 'fulfilled', value: result };
            this.stats.successful++;
            return result;
        } catch (error) {
            if (attempts < this.retryAttempts) {
                this.stats.retries++;
                console.log(`Повторная попытка для элемента ${item} (попытка ${attempts + 1})`);
                await this.delayPromise(this.delay);
                return this.processWithRetry(item, index, attempts + 1);
            } else {
                this.results[index] = { status: 'rejected', reason: error };
                this.stats.failed++;
                throw error;
            }
        }
    }

    delayPromise(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async processItem() {
        if (this.currentIndex >= this.data.length || this.isPaused) {
            return;
        }

        const index = this.currentIndex++;
        const item = this.data[index];
        this.running++;

        try {
            await this.processWithRetry(item, index);
        } catch (error) {
            // Ошибка уже обработана в processWithRetry
        } finally {
            this.running--;
            this.processNext();
        }
    }

    processNext() {
        while (this.running < this.concurrency && 
               this.currentIndex < this.data.length && 
               !this.isPaused) {
            this.processItem();
        }

        if (this.running === 0 && 
            this.currentIndex >= this.data.length && 
            this.resolve) {
            this.resolve({
                results: this.results,
                stats: this.stats
            });
        }
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.processNext();
        }
    }

    async start() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.processNext();
        });
    }
}

async function processDataAsync(data, processorFn, options = {}) {
    const processor = new DataProcessor(data, processorFn, options);
    return processor.start();
}
class AsyncPipeline {
    constructor() {
        this.steps = [];
    }
    
    addStep(stepFn) {
        this.steps.push(stepFn);
        return this; // Для чейнинга
    }
    
    async execute(input) {
        let result = input;
        for (const step of this.steps) {
            result = await step(result);
        }
        return result;
    }
    
    static async parallel(pipelines, input) {
        const results = await Promise.all(
            pipelines.map(pipeline => pipeline.execute(input))
        );
        return results;
    }
    
    // Дополнительный метод для обработки с таймаутом
    withTimeout(ms) {
        const originalExecute = this.execute.bind(this);
        this.execute = async (input) => {
            return AdvancedPromise.timeout(originalExecute(input), ms);
        };
        return this;
    }
    
    // Дополнительный метод для повторных попыток
    withRetry(maxAttempts = 3, delay = 1000) {
        const originalExecute = this.execute.bind(this);
        this.execute = async (input) => {
            return AdvancedPromise.retry(() => originalExecute(input), maxAttempts, delay);
        };
        return this;
    }
}