export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
Vector2.ZERO = new Vector2();
export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Vector2로 새로운 Vector3 생성.
     * @param vector 원본 Vector2
     */
    static FromVector2(vector) {
        return new Vector3(vector.x, vector.y, 0.0);
    }
}
Vector3.ZERO = new Vector3();
