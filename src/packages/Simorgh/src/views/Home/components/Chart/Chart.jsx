/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { useEffect, useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useProductClustersSelection } from '@/services/productClustersSelectionProvider.jsx';
import { makeAssetsUrl } from '@/utils/assetsUrl.js';
import {
  CLUSTER_LEVEL_RADIUS,
  CLUSTER_LEVEL_DISTANCE,
  CLUSTER_LEVEL_LABEL_DISTANCE,
  CLUSTER_LEVEL_ICON_SIZE,
  CLUSTER_LEVEL_FONT_SIZE,
  CLUSTER_LEVEL_NAME,
} from '../../constant/index.js';
import useChangeToggleState from './useChangeToggleState.js';

const BG_COLOR = '#fff';
const BLUE_COLOR = '#007FFF';
const BLACK_COLOR = '#6b7280';
const LIGHT_GRAY = '#d1d5db';

function Chart({ data, handleSelectHost, handleRightClick, handleSelectDevice }) {
  const { selectedProductsClusters } = useProductClustersSelection();

  const currentRoot = useRef(null);
  const currentSeries = useRef(null);

  useChangeToggleState(currentSeries.current);

  const icons = {
    region: makeAssetsUrl('/assets/icons/map-pin.png'),
    zone: makeAssetsUrl('/assets/icons/server.png'),
    server: makeAssetsUrl('/assets/icons/hard-drive.png'),
    device: '',
  };

  const ringIcons = {
    account: makeAssetsUrl('/assets/icons/ring-account.png'),
    container: makeAssetsUrl('/assets/icons/ring-container.png'),
    object: makeAssetsUrl('/assets/icons/ring-object.png'),
  };

  const changeStroke = (circle) => {
    const clustersId = circle?._dataItem?.dataContext?.clustersId || [];

    if (clustersId.length === 0) {
      circle.set('stroke', LIGHT_GRAY);
      circle.set('strokeWidth', 1);
      return;
    }

    if (selectedProductsClusters.length === 0) {
      circle.set('stroke', BLACK_COLOR);
      circle.set('strokeWidth', 1);
      return;
    }

    const isSelectedProduct = selectedProductsClusters.some((sp) =>
      clustersId.includes(sp),
    );
    circle.set('stroke', isSelectedProduct ? BLUE_COLOR : BLACK_COLOR);
    circle.set('strokeWidth', isSelectedProduct ? 1.5 : 1);
  };

  const changeIconOpacity = (circle) => {
    const clustersId = circle?._dataItem?.dataContext?.clustersId || [];

    if (clustersId.length === 0) {
      circle.children.each((child) => {
        if (child.isType('Picture')) {
          child.set('opacity', 0.2);
          child.states.create('hover', {
            opacity: 0.2,
          });
        }
      });
    }
  };

  const changeLinkColor = (link) => {
    const parentClustersId = link?._dataItem?.dataContext?.clustersId || [];
    const childClusterId = link?._settings?.target?.dataContext?.clustersId || [];

    if (parentClustersId.length === 0) {
      link.set('strokeWidth', 1);
      link.set('stroke', am5.color(LIGHT_GRAY));
      return;
    }

    if (selectedProductsClusters.length === 0) {
      link.set('strokeWidth', 1);
      link.set('stroke', am5.color(BLACK_COLOR));
      return;
    }

    const isSelectedProduct = selectedProductsClusters.some(
      (sp) => parentClustersId.includes(sp) && childClusterId.includes(sp),
    );

    link.set(
      'stroke',
      isSelectedProduct ? am5.color(BLUE_COLOR) : am5.color(BLACK_COLOR),
    );
    link.set('strokeWidth', isSelectedProduct ? 1.5 : 1);
  };

  const changeLabelColor = (label) => {
    if (!label) return;

    const clustersId = label?._dataItem?.dataContext?.clustersId || [];

    if (clustersId.length === 0) {
      label.children.each((child) => {
        if (child.isType('Label')) {
          child.set('fill', LIGHT_GRAY);
        }
      });
      return;
    }

    label.children.each((child) => {
      if (child.isType('Label')) {
        if (selectedProductsClusters.length === 0) {
          child.set('fill', BLACK_COLOR);
          return;
        }

        const isSelectedProduct = selectedProductsClusters.some((sp) =>
          clustersId.includes(sp),
        );
        child.set('fill', isSelectedProduct ? BLUE_COLOR : BLACK_COLOR);
      }
    });
  };

  useEffect(() => {
    if (currentSeries.current) {
      currentSeries.current.nodes.each(changeIconOpacity);
      currentSeries.current.circles.each(changeStroke);
      currentSeries.current.outerCircles.each(changeStroke);
      currentSeries.current.labels.each(changeLabelColor);
      currentSeries.current.links.each(changeLinkColor);
    }
  }, [selectedProductsClusters]);

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
          manyBodyStrength: -22,
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
        stroke: BLACK_COLOR,
        radius: 10,
      });
      series.outerCircles.template.setAll({
        fillOpacity: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        fill: BG_COLOR,
        stroke: BLACK_COLOR,
      });
      series.links.template.setAll({
        strength: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        stroke: am5.color('#000000'),
      });

      series.circles.template.adapters.add('radius', (_, target) => {
        const level = target._dataItem?.dataContext?.level;
        return CLUSTER_LEVEL_RADIUS[level] || 30;
      });
      series.links.template.adapters.add('distance', (_, target) => {
        const level = target._dataItem?.dataContext?.level;
        return CLUSTER_LEVEL_DISTANCE[level];
      });

      series.nodes.template.adapters.add('cursorOverStyle', (_, target) => {
        const { level } = target?._dataItem?.dataContext || {};
        if (['server', 'device'].includes(level)) {
          return 'pointer';
        }
        return 'default';
      });

      series.nodes.template.setup = (target) => {
        target.events.on('dataitemchanged', () => {
          const { level, clustersName, rings } = target._dataItem.dataContext;

          if (level === CLUSTER_LEVEL_NAME.host) {
            const items = clustersName
              .map((clusterName) => `<li> • ${clusterName}</li>`)
              .join('');
            target.set('tooltipHTML', `<ul>${items || '<li>No Cluster</li>'}</ul>`);
          }

          if (level === CLUSTER_LEVEL_NAME.name) {
            if (rings.includes('container')) {
              target.children.push(
                am5.Picture.new(root, {
                  width: CLUSTER_LEVEL_ICON_SIZE[level],
                  height: CLUSTER_LEVEL_ICON_SIZE[level],
                  centerX: am5.percent(100),
                  centerY: am5.percent(0),
                  src: ringIcons.container,
                }),
              );
            }
            if (rings.includes('account')) {
              target.children.push(
                am5.Picture.new(root, {
                  width: CLUSTER_LEVEL_ICON_SIZE[level],
                  height: CLUSTER_LEVEL_ICON_SIZE[level],
                  centerX: am5.percent(50),
                  centerY: am5.percent(110),
                  src: ringIcons.account,
                }),
              );
            }
            if (rings.includes('object')) {
              target.children.push(
                am5.Picture.new(root, {
                  width: CLUSTER_LEVEL_ICON_SIZE[level],
                  height: CLUSTER_LEVEL_ICON_SIZE[level],
                  centerX: am5.percent(0),
                  centerY: am5.percent(0),
                  src: ringIcons.object,
                }),
              );
            }
          } else {
            target.children.push(
              am5.Picture.new(root, {
                width: CLUSTER_LEVEL_ICON_SIZE[level],
                height: CLUSTER_LEVEL_ICON_SIZE[level],
                centerX: am5.percent(50),
                centerY: am5.percent(50),
                src: icons[level],
              }),
            );
          }
        });
      };

      series.labels.template.setAll({
        text: '',
      });

      series.labels.template.setup = (target) => {
        target.events.on('dataitemchanged', () => {
          const { level } = target._dataItem.dataContext;
          target.children.push(
            am5.Label.new(root, {
              fontSize: CLUSTER_LEVEL_FONT_SIZE[level],
              fill: BLACK_COLOR,
              text: '{category}',
              centerY: CLUSTER_LEVEL_LABEL_DISTANCE[level],
            }),
          );
        });
      };

      series.nodes.template.events.on('click', (e) => {
        const { level, host, name, ip, clustersId } =
          e.target?._dataItem?.dataContext || {};

        const toggleKeyState = e.target.get('toggleKey');
        if (level === 'server' && toggleKeyState === 'none') {
          handleSelectHost(host);
        }
        if (level === 'device') {
          handleSelectDevice({
            clusterId: clustersId?.[0],
            name,
            ip,
          });
        }
      });

      series.nodes.template.events.on('pointerdown', (e) => {
        e.originalEvent.preventDefault();
        const context = e.target?._dataItem?.dataContext;
        const event = e.originalEvent;
        if (e.originalEvent.button === 2 && context.level === CLUSTER_LEVEL_NAME.host) {
          e.originalEvent.preventDefault();
          handleRightClick(event, context);
        }
      });

      root.dom.addEventListener('contextmenu', (event) => {
        event.preventDefault();
      });

      series.nodes.template.events.on('pointerdown', (e) => {
        if (e.originalEvent && e.originalEvent.button === 2) {
          e.originalEvent.preventDefault();
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
  }, [data, handleSelectHost, handleSelectDevice]);

  return <div id="chartdiv" style={{ width: '100%', height: '100%' }} />;
}

export default Chart;
