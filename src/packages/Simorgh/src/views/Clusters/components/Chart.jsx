/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {useEffect, useLayoutEffect, useRef} from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {useProductSelection} from '@/services/productSelectionProvider';
import {
  CLUSTER_LEVEL_RADIUS,
  CLUSTER_LEVEL_DISTANCE,
  CLUSTER_LEVEL_LABEL_DISTANCE,
  CLUSTER_LEVEL_ICON_SIZE,
  CLUSTER_LEVEL_FONT_SIZE,
} from '../constant/index.js';

const BG_COLOR = '#fff';
const STROKE_COLOR = '#6b7280';
const LIGHT_GRAY = '#d1d5db';

function Chart({data, handleSelectHost}) {
  const {selectedProducts} = useProductSelection();
  const currentRoot = useRef(null);
  const currentSeries = useRef(null);

  const icons = {
    region: '/apps/Simorgh/assets/icons/map-pin.png',
    zone: '/apps/Simorgh/assets/icons/server.png',
    server: '/apps/Simorgh/assets/icons/hard-drive.png',
    device: '',
  };

  const changeStroke = (circle) => {
    let products = circle?._dataItem?.dataContext?.products || [];

    if (products.length === 0) {
      products = ['empty'];
    }

    if (selectedProducts.length === 0) {
      circle.set('stroke', STROKE_COLOR);
      return;
    }

    const isSelectedProduct = selectedProducts.some((sp) =>
      products.includes(sp),
    );
    circle.set('stroke', isSelectedProduct ? STROKE_COLOR : LIGHT_GRAY);
  };

  const changeIconOpacity = (circle) => {
    const picture = circle.children._values[2];
    let products = circle?._dataItem?.dataContext?.products || [];
    if (products.length === 0) {
      products = ['empty'];
    }

    if (selectedProducts.length === 0) {
      picture.set('opacity', 1);
      return;
    }

    const isSelectedProduct = selectedProducts.some((sp) =>
      products.includes(sp),
    );
    picture.set('opacity', isSelectedProduct ? 1 : 0.2);
  };

  const changeOpacity = (link) => {
    let products = link?._dataItem?.dataContext?.products || [];
    if (products.length === 0) {
      products = ['empty'];
    }

    if (selectedProducts.length === 0) {
      link.set('opacity', 1);
      return;
    }

    const isSelectedProduct = selectedProducts.some((sp) =>
      products.includes(sp),
    );
    link.set('opacity', isSelectedProduct ? 1 : 0.2);
  };

  useEffect(() => {
    if (currentSeries.current) {
      currentSeries.current.nodes.each(changeIconOpacity);
      currentSeries.current.circles.each(changeStroke);
      currentSeries.current.outerCircles.each(changeStroke);
      currentSeries.current.links.each(changeOpacity);
      currentSeries.current.labels.each(changeOpacity);
    }
  }, [selectedProducts]);

  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv');

    if (data.length) {
      root.setThemes([am5themes_Animated.new(root)]);

      const zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
          width: am5.p100,
          height: am5.p100,
          pinchZoom: true,
        }),
      );

      zoomableContainer.children.push(
        am5.ZoomTools.new(root, {
          target: zoomableContainer,
        }),
      );

      const series = zoomableContainer.contents.children.push(
        am5hierarchy.ForceDirected.new(root, {
          singleBranchOnly: false,
          downDepth: 4,
          topDepth: 1,
          initialDepth: 4,
          valueField: 'value',
          categoryField: 'name',
          childDataField: 'children',
          idField: 'name',
          linkWithField: 'linkWith',
          maskContents: false,
          centerStrength: 0.5,
          manyBodyStrength: -15,
          nodePadding: 15,
        }),
      );

      series.nodes.template.setAll({
        tooltipText: '',
        toggleKey: 'none',
      });

      series.circles.template.setAll({
        templateField: 'nodeSettings',
        fillOpacity: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        fill: BG_COLOR,
        stroke: STROKE_COLOR,
        radius: 10,
      });
      series.outerCircles.template.setAll({
        fillOpacity: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        fill: BG_COLOR,
        stroke: STROKE_COLOR,
      });
      series.links.template.setAll({
        strength: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
      });

      series.circles.template.adapters.add('radius', (_, target) => {
        const level = target._dataItem?.dataContext?.level;
        return CLUSTER_LEVEL_RADIUS[level] || 30;
      });
      series.links.template.adapters.add('stroke', () =>
        am5.color(STROKE_COLOR),
      );
      series.links.template.adapters.add('distance', (_, target) => {
        const level = target._dataItem?.dataContext?.level;
        return CLUSTER_LEVEL_DISTANCE[level];
      });

      series.nodes.template.adapters.add('cursorOverStyle', (_, target) => {
        const {level} = target?._dataItem?.dataContext;
        if (level === 'server') {
          return 'pointer';
        }
        return 'default';
      });

      series.nodes.template.setup = (target) => {
        target.events.on('dataitemchanged', () => {
          const {level} = target._dataItem.dataContext;
          target.children.push(
            am5.Picture.new(root, {
              width: CLUSTER_LEVEL_ICON_SIZE[level],
              height: CLUSTER_LEVEL_ICON_SIZE[level],
              centerX: am5.percent(50),
              centerY: am5.percent(50),
              src: icons[level],
            }),
          );
        });
      };

      series.labels.template.setAll({
        text: '',
      });

      series.labels.template.setup = (target) => {
        target.events.on('dataitemchanged', () => {
          const {level} = target._dataItem.dataContext;
          target.children.push(
            am5.Label.new(root, {
              fontSize: CLUSTER_LEVEL_FONT_SIZE[level],
              fill: STROKE_COLOR,
              text: '{category}',
              centerY: CLUSTER_LEVEL_LABEL_DISTANCE[level],
            }),
          );
        });
      };

      series.nodes.template.events.on('click', (e) => {
        const {level, host} = e.target?._dataItem?.dataContext;
        if (level === 'server') {
          handleSelectHost(host);
        }
      });

      series.data.setAll(data);
      series.set('selectedDataItem', series.dataItems[0]);

      currentSeries.current = series;
      currentRoot.current = root;
    }

    return () => {
      root.dispose();
    };
  }, [data, handleSelectHost]);

  return <div id="chartdiv" style={{width: '100%', height: '100%'}} />;
}
export default Chart;
