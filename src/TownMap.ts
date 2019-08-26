import { People } from "./People";
import { Point } from "./Point";
import * as streetImage from "../images/map0.gif";
import * as mapBgImage from "../images/map1.gif";
import * as mapFgImage from "../images/map2.gif";
import * as charImage from "../images/people.gif";
import * as statusImage from "../images/status.gif";
import { RouteSearch } from "./RouteSearch";

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
    private mapImage;

    /** 町の人のリスト */
    private peopleList: Array<People>;
    /** 主人公 */
    private mainPeople: People;

    /** フレームカウンター */
    private counter = 0;

    /** スクロール座標 */
	private screenPos: Point;

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
		this.mapImage = document.createElement("canvas");

		// 移動探索アルゴリズム
		const rs = new RouteSearch(streetImage);

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
	getStreetImage() {}
	// マップ表示用の裏画面を返します。この画面には人々が描画されています。
	getMapImage() {}
	// マップを描画します。マップ画面は「背景」「人々」「前景」の3つのレイヤーで構成されます。
	drawMapImage() {}
	// 時間を進め、町の人々を移動させます。移動後に人々はY座標でソートされます。
	// また、主人公が中心に来るように、マップのスクロール座標も更新します。
	update() {}
	// 主人公を返します。
	getMainPeople() {}
	// 人々のリストを返します。
	getPeopleList() {}
	// マップのスクロール座標を返します。
	getScreenPos() {}
	// 現在のフレームカウントを返します。
	getCounter() {}
	// テスト用
	inca(a: number) {return a+1;}
}