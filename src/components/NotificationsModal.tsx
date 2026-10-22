import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Clock, BellRing, BatteryWarning } from 'lucide-react';
import { NotificationItem } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNotificationClick?: (notif: NotificationItem) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const { t, language } = useI18n();
  const [filter, setFilter] = useState<'all' | 'risks' | 'activity' | 'battery'>('all');

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'risks') return n.type === 'weather_risk' || n.type === 'sos' || n.type === 'battery_low';
    if (filter === 'activity') return n.type === 'arrival' || n.type === 'crossing';
    if (filter === 'battery') return n.type === 'battery_low';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getLocalizedNotification = (item: NotificationItem) => {
    if (language === 'ms') {
      if (item.id === 'notif-battery') {
        return {
          title: 'Amaran Bateri Lemah (18%)',
          message: 'Bateri tag Sarah Tan menurun ke 18% (bawah had keselamatan 20%). Sila cas atau gantikan bateri untuk mengekalkan keutamaan lintasan jalan & penjejakan.',
          badge: 'Bateri 18%',
        };
      }
      if (item.id === 'notif-1') {
        return {
          title: 'Amaran Cuaca Panas Ekstrem (34°C)',
          message: 'Indeks haba tinggi di Elmina Barat. Nasihat risiko untuk warga emas: pastikan minum air secukupnya & tangguhkan aktiviti luar.',
          badge: 'Risiko Cuaca',
        };
      }
      if (item.id === 'notif-2') {
        return {
          title: 'Lintasan Selamat Direkodkan (+30s)',
          message: 'Radar lintasan jalan EW-XW02 memanjangkan lampu hijau pejalan kaki secara automatik sebanyak +30s.',
          badge: '+30s Lampu Hijau',
        };
      }
      if (item.id === 'notif-3') {
        return {
          title: 'Sarah Tan Tiba di Pintu Sekolah',
          message: 'Tag Sarah Tan dikesan memasuki Zon Selamat SK Elmina Barat (Pintu A). Status: Pegun (Selamat).',
          badge: 'Tiba Selamat',
        };
      }
      if (item.id === 'notif-4') {
        return {
          title: 'Data Pinggir Perbandaran Disegerakkan',
          message: 'Penyegerakan tempatan MQTT disulitkan selesai di seluruh 14 suar jalan Elmina Barat.',
          badge: 'MQTT Disegerakkan',
        };
      }
    } else if (language === 'zh') {
      if (item.id === 'notif-battery') {
        return {
          title: '低电量告警 (18%)',
          message: '陈莎拉的标签电量已降至 18% (低于 20% 安全阈值)。请尽快充电以保持斑马线优先通行与边缘定位。',
          badge: '电量 18%',
        };
      }
      if (item.id === 'notif-1') {
        return {
          title: '极端高温天气预警 (34°C)',
          message: '艾美娜西区热指数偏高。健康提示: 务必多补充水分，并建议推迟午后户外散步。',
          badge: '高温风险',
        };
      }
      if (item.id === 'notif-2') {
        return {
          title: '记录到安全过街通行 (+30秒)',
          message: '斑马线雷达已自动为行人延长绿灯时间 +30秒。',
          badge: '+30秒 绿灯延长',
        };
      }
      if (item.id === 'notif-3') {
        return {
          title: '陈莎拉已抵达小学大门',
          message: '已检测到陈莎拉的标签进入艾美娜西区小学安全区 (A门)。当前状态: 静止 (安全)。',
          badge: '安全抵达',
        };
      }
      if (item.id === 'notif-4') {
        return {
          title: '镇区边缘数据同步完成',
          message: '艾美娜西区全部 14 个路面物联网信标的 MQTT 本地加密同步已完成。',
          badge: 'MQTT 已同步',
        };
      }
    }

    return {
      title: item.title,
      message: item.message,
      badge: item.badge,
    };
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end transition-all">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full max-h-[85%] bg-white rounded-t-[32px] px-5 pt-3 pb-6 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-red-50 text-red-500">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                {t.notifications.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {t.notifications.unreadCountText(unreadCount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                {t.notifications.markAllRead}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 my-3 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.notifications.allTab}
          </button>
          <button
            onClick={() => setFilter('battery')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'battery' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.notifications.batteryTab}
          </button>
          <button
            onClick={() => setFilter('risks')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'risks' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.notifications.risksTab}
          </button>
          <button
            onClick={() => setFilter('activity')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'activity' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.notifications.activityTab}
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[380px]">
          {filteredNotifs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              {t.notifications.noNotifications}
            </div>
          ) : (
            filteredNotifs.map((item) => {
              const loc = getLocalizedNotification(item);
              const isBatteryAlert = item.type === 'battery_low';

              return (
                <div
                  key={item.id}
                  onClick={() => onNotificationClick?.(item)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isBatteryAlert
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                      : !item.isRead
                      ? 'bg-red-50/30 border-red-200/80 shadow-xs'
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      {item.type === 'battery_low' && (
                        <span className="p-1 rounded-md bg-amber-200 text-amber-900">
                          <BatteryWarning className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      )}
                      {item.type === 'weather_risk' && (
                        <span className="p-1 rounded-md bg-amber-100 text-amber-700">
                          <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      )}
                      {item.type === 'crossing' && (
                        <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                          <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      )}
                      {item.type === 'arrival' && (
                        <span className="p-1 rounded-md bg-blue-100 text-blue-700">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      )}
                      {item.type === 'edge_status' && (
                        <span className="p-1 rounded-md bg-slate-100 text-slate-600">
                          <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      )}

                      <h4 className={`font-bold text-xs tracking-tight ${isBatteryAlert ? 'text-amber-900 font-extrabold' : 'text-slate-900'}`}>
                        {loc.title}
                      </h4>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-[11.5px] text-slate-600 leading-snug font-normal pl-6">
                    {loc.message}
                  </p>

                  {loc.badge && (
                    <div className="mt-2 pl-6 flex items-center justify-between">
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md ${
                          item.type === 'battery_low'
                            ? 'bg-amber-200 text-amber-900'
                            : item.type === 'weather_risk'
                            ? 'bg-amber-100 text-amber-800'
                            : item.type === 'crossing'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {loc.badge}
                      </span>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
