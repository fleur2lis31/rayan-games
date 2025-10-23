class ArabicCalligraphyGame {
    constructor() {
        this.canvas = document.getElementById('drawingCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        
        this.guideImages = {
            alif: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCI+PHBhdGggZD0iTTEwMCA1MEwxMDAgMjUwIiBzdHJva2U9IiNGRjY2MDAiIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg==',
            ba: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkY2NjAwIiBzdHJva2Utd2lkdGg9IjUiLz48L3N2Zz4=',
            jeem: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCI+PHBhdGggZD0iTTUwIDE1MEwxNTAgMTUwQzE3MCAxMzAgMTcwIDE3MCAxNTAgMTUwIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRjY2MDAiIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg==',
            dal: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCI+PHBhdGggZD0iTTEwMCA1MEwxMDAgMjAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRjY2MDAiIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg=='
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.clearCanvas();
        this.updateGuide('alif');
    }
    
    setupEventListeners() {
        // Souris
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        
        // Touch
        this.canvas.addEventListener('touchstart', this.startDrawingTouch.bind(this));
        this.canvas.addEventListener('touchmove', this.drawTouch.bind(this));
        this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
        
        // Contrôles
        document.getElementById('clearBtn').addEventListener('click', this.clearCanvas.bind(this));
        document.getElementById('saveBtn').addEventListener('click', this.saveDrawing.bind(this));
        document.getElementById('letterSelect').addEventListener('change', (e) => {
            this.updateGuide(e.target.value);
        });
    }
    
    startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    }
    
    startDrawingTouch(e) {
        e.preventDefault();
        this.isDrawing = true;
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        [this.lastX, this.lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    }
    
    drawTouch(e) {
        if (!this.isDrawing) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        [this.lastX, this.lastY] = [x, y];
    }
    
    stopDrawing() {
        this.isDrawing = false;
    }
    
    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateGuide(letter) {
        document.getElementById('letterGuide').src = this.guideImages[letter];
    }
    
    saveDrawing() {
        const link = document.createElement('a');
        link.download = 'خط-عربي.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
}

// Démarrer le jeu
new ArabicCalligraphyGame();
