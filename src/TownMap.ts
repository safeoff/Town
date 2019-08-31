import { People } from "./People";
import { Point } from "./Point";
import { RouteSearch } from "./RouteSearch";
import * as streetImage from "../images/map0.gif";
import * as mapBgImage from "../images/map1.gif";
import * as mapFgImage from "../images/map2.gif";
import * as charImage from "../images/people.gif";
import * as statusImage from "../images/status.gif";

// 町データ管理クラス。画像のロード、マップ画面の描画も担当する。
export class TownMap {
    /** マップソースのサイズ */
    public static SOURCE_SIZE = 32;
    /** たてよこのマップソース数 */
    public static SOURCE_NUM = 60;
    /** マップの幅 */
    public static MAP_W = TownMap.SOURCE_SIZE * TownMap.SOURCE_NUM;
    /** マップの高さ */
    public static MAP_H = TownMap.SOURCE_SIZE * TownMap.SOURCE_NUM;

    /** マップ表示スクリーンの幅 */
    private static SCREEN_W = TownMap.SOURCE_SIZE * 11;
    /** マップ表示スクリーンの高さ */
    private static SCREEN_H = TownMap.SOURCE_SIZE * 11;

    /** 町を歩く人の数 */
    private static PEOPLE_NUM = 128;

    /** キャラ画像の幅 */
    private static WIDTH = 32;
    /** キャラ画像の高さ */
    private static HEIGHT = 40;

    /** 通路画像 */
    private streetImage = document.createElement("img");
    /** マップ背景画像 */
    private mapBgImage = document.createElement("img");
    /** マップ前景画像 */
    private mapFgImage = document.createElement("img");
    /** キャラ画像 */
    private charImage = document.createElement("img");
    /** キャラ頭上マーク画像 */
    private statusImage = document.createElement("img");

    /** マップ表示用内部バッファ */
    private mapImage = document.createElement("canvas");

    /** 町の人のリスト */
    private peopleList: Array<People>;
    /** 主人公 */
    private mainPeople: People;

    /** フレームカウンター */
    private counter = 0;

    /** スクロール座標 */
	private screenPos: Point = new Point();

	// 画像の読み込み、拡大マップ表示用の裏画面の準備、人々の初期化を行う。
	constructor() {
		// マップ画像読み込み
		this.streetImage.src = streetImage;
		this.mapBgImage.src = mapBgImage;
		this.mapFgImage.src = mapFgImage;
		// キャラ画像読み込み
		this.charImage.src = charImage;
		this.statusImage.src = statusImage;

		// マップ表示用裏画面
		this.mapImage.width = TownMap.SCREEN_W;
		this.mapImage.height = TownMap.SCREEN_H;

		// 移動探索アルゴリズム
		const rs = new RouteSearch(this.streetImage);

		// 人々の初期化
		this.peopleList = new Array();
		// 主人公の生成
		this.mainPeople = new People(rs);
		// 主人公専用タイプ
		this.mainPeople.type = 0;
		this.peopleList.push(this.mainPeople);
		// 主人公以外の生成
		for (let i = 1; i < TownMap.PEOPLE_NUM; i++) {
			const p = new People(rs);
			this.peopleList.push(p);
		}
	}
	// 通路情報が描かれた縮小マップ画像を返します。
	public getStreetImage(): HTMLImageElement {
		return this.streetImage;
	}

	// マップ表示用の裏画面を返します。この画面には人々が描画されています。
	public getMapImage(): HTMLCanvasElement {
		return this.mapImage;
	}

	// マップを描画します。マップ画面は「背景」「人々」「前景」の
	// 3つのレイヤーで構成されます。
	public drawMapImage(): void {
		const mapWidth = this.mapImage.width;
		const mapHeight = this.mapImage.height;
		const ctx = this.mapImage.getContext('2d');
		// マップ背景の描画
		ctx.drawImage(this.mapBgImage, this.screenPos.x, this.screenPos.y,
			mapWidth, mapHeight, 0, 0, mapWidth, mapHeight)

		// 人々の描画
		for (let i = 0; i < this.peopleList.length; i++) {
			const people = this.peopleList[i];
			const srcX = people.dir * 64 + people.walkPattern * 32;
			const srcY = people.type * 40;
			const destX = people.pos.x - this.screenPos.x;
			const destY = people.pos.y - this.screenPos.y - 8;

			ctx.drawImage(this.charImage, srcX, srcY, TownMap.WIDTH, TownMap.HEIGHT,
				destX, destY, TownMap.WIDTH, TownMap.HEIGHT);

			// ゴール到達ステータスを表示
			if (people.status == People.GOAL) {
				ctx.drawImage(this.statusImage, 0, 0, 32, 32, destX, destY - 32, 32, 32);
			}

			// 再検索ステータスを表示
			if (people.status == People.SEARCH) {
				ctx.drawImage(this.statusImage, 32, 0, 32, 32, destX, destY - 32, 32, 32);
			}
		}

		// マップ前景の描画
		ctx.drawImage(this.mapFgImage, this.screenPos.x, this.screenPos.y,
			mapWidth, mapHeight, 0, 0, mapWidth, mapHeight)
	}

	// 時間を進め、町の人々を移動させます。移動後に人々はY座標でソートされます。
	// また、主人公が中心に来るように、マップのスクロール座標も更新します。
	public update(): void {
		// カウンターを進める
		this.counter++;

		// 人々の更新
		for (let i = 0; i < this.peopleList.length; i++) {
			const people = this.peopleList[i];
			people.update(this.counter);
		}

		// y座標で人々を並び替え
		this.peopleList.sort(function(a, b){
			if (a.pos.y > b.pos.y) return 1;
			if (a.pos.y < b.pos.y) return -1;
			return 0;
		});

		// 主人公が中心になるようスクリーン座標を計算する
		this.screenPos.x = this.mainPeople.pos.x - TownMap.SOURCE_SIZE * 5;
		this.screenPos.y = this.mainPeople.pos.y - TownMap.SOURCE_SIZE * 5;

		if (this.screenPos.x < 0) {
			this.screenPos.x = 0;
		} else if (this.screenPos.x > TownMap.MAP_W - TownMap.SCREEN_W) {
			this.screenPos.x = TownMap.MAP_W - TownMap.SCREEN_W;
		}

		if (this.screenPos.y < 0) {
			this.screenPos.y = 0;
		} else if (this.screenPos.y > TownMap.MAP_H - TownMap.SCREEN_H) {
			this.screenPos.y = TownMap.MAP_H - TownMap.SCREEN_H;
		}

	}
	// 主人公を返します。
	public getMainPeople(): People {
		return this.mainPeople;
	}
	// 人々のリストを返します。
	public getPeopleList(): Array<People> {
		return this.peopleList;
	}
	// マップのスクロール座標を返します。
	public getScreenPos(): Point {
		return this.screenPos;
	}
	// 現在のフレームカウントを返します。
	public getCounter(): number {
		return this.counter;
	}
}